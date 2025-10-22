import { useContext, type FC } from "react";
import './Main.css';
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import ReactMarkdown from "react-markdown";
import { SearchInput } from "../SearchInput/SearchInput";
import { Greeting } from "../Greeting/Greeting";

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
                    ?   <Greeting />
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