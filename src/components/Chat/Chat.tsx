import { useContext, type FC } from "react";
import { assets } from "../../assets/assets";
import ReactMarkdown from "react-markdown";
import './Chat.css';
import { AppContext, ResultContext } from "../../context/Context";

export const Chat: FC = () => {
    const { isLoading, recentThread } = useContext(AppContext);
    const { resultData } = useContext(ResultContext);
    
    return (
        <div className="result">
            {recentThread.map((threadItem, index) => {
                return (
                    <div key={index}>
                    <div className="result-title">
                <img src={assets.user_icon} alt="user" />
                 <p>{threadItem.prompt}</p>
            </div>
            <div className="result-data">
                <img src={assets.gemini_icon} alt="gemini" />
                {threadItem.result
                    ? <div><ReactMarkdown>{threadItem.result}</ReactMarkdown></div>
                    : isLoading 
                        ? <div className="loader">
                            <hr />
                            <hr />
                            <hr />
                        </div>
                        : <div><ReactMarkdown>{resultData}</ReactMarkdown></div>
                }
            </div>
            </div>
                )
            })}
        </div>    
    );
}