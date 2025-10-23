import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AppContext, ResultContext } from "./Context";
import { runChat } from "../config/gemini";

export const ContextProvider = (props: {children: ReactNode}) => {
    const [recentPrompt, setRecentPrompt] = useState('');
    const [prevPrompts, setPrevPrompts] = useState<string[]>(localStorage.getItem('prevPrompts') ? JSON.parse(localStorage.getItem('prevPrompts')!) : []);
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

    const newChat = useCallback(() => {
        setIsLoading(false);
        setShowResult(false);
    }, []);

    const onSent = useCallback(async (prompt: string) => {
        setResultData('');
        setIsLoading(true);
        setShowResult(true);
        let response = '';
        setRecentPrompt(prompt);
        console.log({prevPrompts});
        if (!prevPrompts.includes(prompt)) {
            localStorage.setItem('prevPrompts', JSON.stringify([...prevPrompts, prompt]));
            setPrevPrompts((prev) => [...prev, prompt]);
        }
        
        response = await runChat(prompt);
        const responseArray = response.split(' ');
        responseArray.forEach((word, index) => delayPara(index, word + ' '));
        setIsLoading(false);
    }, [prevPrompts]);

    const appContextValue = useMemo(() => ({
        prevPrompts,
        onSent,
        recentPrompt,
        setRecentPrompt,
        isLoading,
        showResult,
        newChat
    }), [prevPrompts, onSent, recentPrompt, setRecentPrompt, isLoading, showResult, newChat]);

    const resultContextValue = useMemo(() => ({resultData}), [resultData]);

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