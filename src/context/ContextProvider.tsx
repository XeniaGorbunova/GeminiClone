import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AppContext, ErrorContext, ResultContext } from "./Context";
import { runChat } from "../config/gemini";
import { type ResultContextType, type AppContextType, type ErrorContextType } from "./models";
import { localStorageHandler } from "../helpers/LocalStorageHandler";

export const ContextProvider = (props: {children: ReactNode}) => {
    const [recentPrompt, setRecentPrompt] = useState('');
    const [prevPrompts, setPrevPrompts] = useState<string[]>(localStorageHandler.getPrevPrompts());
    const [showResult, setShowResult] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [resultData, setResultData] = useState('');
    const [error, setError] = useState('');

    // Use ref to track all active timeouts
    const timeoutRefs = useRef<number[]>([]);

    const delayPara = (index: number, nextWord: string) => {
        const timeoutId = setTimeout(
            function() {
                setResultData((prev) => prev + nextWord)
            }, 15 * index)

        timeoutRefs.current.push(timeoutId);    
    };

    const newChat = useCallback<AppContextType['newChat']>(() => {
        console.log('New Chat');
        setIsLoading(false);
        setShowResult(false);
        clearAllTimeouts();
    }, []);

    const onSent = useCallback<AppContextType['onSent']>(async (prompt: string) => {
        setResultData('');
        setIsLoading(true);
        setShowResult(true);
        setRecentPrompt(prompt);
        if (!prevPrompts.includes(prompt)) {
            localStorageHandler.savePrevPrompts([...prevPrompts, prompt]);
            setPrevPrompts((prev) => [...prev, prompt]);
        }

        try {
            const response = await runChat(prompt);
            const responseArray = response.split(' ');
            responseArray.forEach((word, index) => delayPara(index, word + ' '));
        } catch(error) {
            if (error instanceof Error) {
                setError(error.message);
            } else if (typeof error === 'string') {
                setError(error);
            } else {
                setError('Failed to get response from AI');
                console.error(error);
            }
        } finally {
            setIsLoading(false);
        }
    }, [prevPrompts]);

    const appContextValue = useMemo<AppContextType>(() => ({
        prevPrompts,
        setPrevPrompts,
        onSent,
        recentPrompt,
        setRecentPrompt,
        isLoading,
        showResult,
        newChat
    }), [prevPrompts, setPrevPrompts, onSent, recentPrompt, setRecentPrompt, isLoading, showResult, newChat]);

    const resultContextValue = useMemo<ResultContextType>(() => ({resultData}), [resultData]);
    const errorContextValue = useMemo<ErrorContextType>(() => ({ error, setError }), [error, setError]);

    const clearAllTimeouts = useCallback(() => {
        timeoutRefs.current.forEach((timeoutId) => {
            clearTimeout(timeoutId);
        });
        timeoutRefs.current = []; // Reset the array
    }, []);

    useEffect(() => {
        return () => {
            clearAllTimeouts();
        };
    }, []);

    return (
        <AppContext.Provider value={appContextValue}>
            <ResultContext.Provider value={resultContextValue}>
                <ErrorContext.Provider value={errorContextValue}>
                    {props.children}
                </ErrorContext.Provider>
            </ResultContext.Provider>
        </AppContext.Provider>
    )
}