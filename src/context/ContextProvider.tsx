import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AppContext, ErrorContext, ResultContext } from "./Context";
import { runChat } from "../config/gemini";
import { type ResultContextType, type AppContextType, type ErrorContextType, type Thread } from "./models";
import { localStorageHandler } from "../helpers/LocalStorageHandler";

export const ContextProvider = (props: {children: ReactNode}) => {
    const [recentThread, setRecentThread] = useState<Thread[]>([]);
    const [prevThreads, setPrevThreads] = useState<Thread[][]>(localStorageHandler.getPrevThreads());
    const [showResult, setShowResult] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [resultData, setResultData] = useState('');
    const [lastResult, setLastResult] = useState('');
    const [error, setError] = useState('');

    // Use ref to track all active timeouts
    const timeoutRefs = useRef<number[]>([]);

    const clearAllTimeouts = useCallback(() => {
        timeoutRefs.current.forEach((timeoutId) => {
            clearTimeout(timeoutId);
        });
        timeoutRefs.current = []; // Reset the array
    }, []);

    const delayPara = (index: number, nextWord: string) => {
        const timeoutId = setTimeout(
            function() {
                setResultData((prev) => prev + nextWord)
            }, 15 * index)

        timeoutRefs.current.push(timeoutId);    
    };

    const newChat = useCallback<AppContextType['newChat']>(() => {
        setRecentThread([]);
        setIsLoading(false);
        setShowResult(false);
        clearAllTimeouts();
    }, [clearAllTimeouts]);

    const onSent = useCallback<AppContextType['onSent']>(async (prompt: string) => {
        if (recentThread.at(-1) && !recentThread.at(-1)!.result) {
            setRecentThread((prev) => [...prev.slice(0, -1), {prompt: prev.at(-1)!.prompt, result: lastResult}]);
        }

        setLastResult('');
        setResultData('');
        setIsLoading(true);
        setShowResult(true);
        setRecentThread((prev) => [...prev, {prompt, result: ''}]);

        try {
            const response = await runChat(prompt);
            setLastResult(response);
            const responseArray = response.split(' ');
            responseArray.forEach((word, index) => delayPara(index, word + ' '));

            const threadIndex = prevThreads.findIndex((thread: Thread[]) => thread[0].prompt === (recentThread[0]?.prompt ?? prompt));

            if (threadIndex === -1) {
                localStorageHandler.savePrevThreads([...prevThreads, [...recentThread, {prompt, result: response}]]);
                setPrevThreads((prev) => [... prev, [...recentThread, {prompt, result: response}]]);
                console.log([... prevThreads, [...recentThread, {prompt, result: response}]]);
            } else {
                const mappedThreads = prevThreads.map((thread: Thread[], index: number) => {
                    if (index === threadIndex) return [...thread, {prompt, result: response}];

                    return structuredClone(thread);
                });
                setPrevThreads(mappedThreads);
                localStorageHandler.savePrevThreads(mappedThreads);
            }
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
    }, [recentThread, prevThreads, lastResult]);

    const appContextValue = useMemo<AppContextType>(() => ({
        prevThreads,
        setPrevThreads,
        onSent,
        recentThread,
        setRecentThread,
        isLoading,
        showResult,
        setShowResult,
        newChat
    }), [prevThreads, setPrevThreads, onSent, recentThread, setRecentThread, isLoading, showResult, setShowResult, newChat]);

    const resultContextValue = useMemo<ResultContextType>(() => ({resultData}), [resultData]);
    const errorContextValue = useMemo<ErrorContextType>(() => ({ error, setError }), [error, setError]);

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