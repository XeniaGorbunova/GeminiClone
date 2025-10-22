import { useEffect, useRef, useState, type ReactNode } from "react";
import { Context } from "./Context";
import { runChat } from "../config/gemini";

export const ContextProvider = (props: {children: ReactNode}) => {
    const [recentPrompt, setRecentPrompt] = useState('');
    const [prevPrompts, setPrevPrompts] = useState<string[]>([]);
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

    const newChat = () => {
        setIsLoading(false);
        setShowResult(false);
    };

    const onSent = async (prompt: string) => {
        setResultData('');
        setIsLoading(true);
        setShowResult(true);
        let response = '';
        setRecentPrompt(prompt);
        if (!prevPrompts.includes(prompt)) {
            setPrevPrompts((prev) => [...prev, prompt]);
        }
        
        response = await runChat(prompt);
        const responseArray = response.split(' ');
        responseArray.forEach((word, index) => delayPara(index, word + ' '));
        setIsLoading(false);
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        recentPrompt,
        setRecentPrompt,
        isLoading,
        resultData,
        showResult,
        newChat
    };

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
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}