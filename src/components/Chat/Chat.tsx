import { useContext, type FC } from "react";
import { assets } from "../../assets/assets";
import ReactMarkdown from "react-markdown";
import './Chat.css';
import { AppContext, ResultContext } from "../../context/Context";

export const Chat: FC = () => {
    console.log('Chat');
    const { isLoading, recentPrompt } = useContext(AppContext);
    const { resultData } = useContext(ResultContext);
    
    return (
        <div className="result">
            <div className="result-title">
                <img src={assets.user_icon} alt="user" />
                 <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
                <img src={assets.gemini_icon} alt="gemini" />
                {isLoading 
                    ? <div className="loader">
                        <hr />
                        <hr />
                        <hr />
                    </div>
                    : <div><ReactMarkdown>{resultData}</ReactMarkdown></div>
                }
            </div>
        </div>    
    );
}