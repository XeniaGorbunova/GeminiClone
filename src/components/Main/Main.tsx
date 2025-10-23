import { useContext, type FC } from "react";
import './Main.css';
import { assets } from "../../assets/assets";
import { AppContext, ResultContext } from "../../context/Context";
import ReactMarkdown from "react-markdown";
import { SearchInput } from "../SearchInput/SearchInput";
import { Greeting } from "../Greeting/Greeting";
import { Chat } from "../Chat/Chat";

export const Main: FC = () => {
    console.log('Main');
    const { showResult } = useContext(AppContext);

    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">

                {!showResult 
                    ?   <Greeting />
                    :   <Chat />
                }
                
                <SearchInput />
            </div>
        </div>
    );
}