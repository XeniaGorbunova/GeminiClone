import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AppContext, ResultContext } from "./Context";
import { runChat } from "../config/gemini";
import { type ResultContextType, type AppContextType } from "./models";
import { localStorageHandler } from "../helpers/LocalStorageHandler";

export const ContextProvider = (props: {children: ReactNode}) => {
    const [recentPrompt, setRecentPrompt] = useState('');
    const [prevPrompts, setPrevPrompts] = useState<string[]>(localStorageHandler.getPrevPrompts());
    const [showResult, setShowResult] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [resultData, setResultData] = useState('');

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
        setIsLoading(false);
        setShowResult(false);
    }, []);

    const onSent = useCallback<AppContextType['onSent']>(async (prompt: string) => {
        setResultData('');
        setIsLoading(true);
        setShowResult(true);
        let response = '';
        setRecentPrompt(prompt);
        if (!prevPrompts.includes(prompt)) {
            localStorageHandler.savePrevPrompts([...prevPrompts, prompt]);
            setPrevPrompts((prev) => [...prev, prompt]);
        }
        
        response = await runChat(prompt);
        const responseArray = response.split(' ');
        responseArray.forEach((word, index) => delayPara(index, word + ' '));
        setIsLoading(false);
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

    const clearAllTimeouts = () => {
        timeoutRefs.current.forEach((timeoutId) => {
            clearTimeout(timeoutId);
        });
        timeoutRefs.current = []; // Reset the array
    };

    useEffect(() => {
        return () => {
            clearAllTimeouts();
        };
    }, []);

    return (
        <AppContext.Provider value={appContextValue}>
            <ResultContext.Provider value={resultContextValue}>
                {props.children}
            </ResultContext.Provider>
        </AppContext.Provider>
    )
}