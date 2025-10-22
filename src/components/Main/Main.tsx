import { useContext, type FC } from "react";
import './Main.css';
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import ReactMarkdown from "react-markdown";
import { SearchInput } from "../SearchInput/SearchInput";

export const Main: FC = () => {
    console.log('Main');
    const  {
            recentPrompt,
            isLoading,
            resultData,
            showResult
        } = useContext(Context);

    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">

                {!showResult 
                    ?   <>
                            <div className="greet">
                            <p><span>Hello, Dev.</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="compass" />
                            </div>
                            <div className="card">
                                <p>Briefly summarise this concept: urban planning</p>
                                <img src={assets.bulb_icon} alt="bulb" />
                            </div>
                            <div className="card">
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="message" />
                            </div>
                            <div className="card">
                                <p>Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt="code" />
                            </div>
                        </div>
                        </>
                    :   <div className="result">
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
                }
                
                <SearchInput />
            </div>
        </div>
    );
}