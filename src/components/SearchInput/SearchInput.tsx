import { useContext, useState, type FC } from "react"
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/Context";
import './SearchInput.css';

export const SearchInput: FC = () => {
    const [input, setInput] = useState('');
    const  { onSent } = useContext(AppContext);

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);
    const sendPromptHandler = () => {
        setInput('');
        onSent(input);
    }

    return (
        <div className="main-bottom">
                <div className="search-box">
                    <input type="text" placeholder="Enter a prompt here" value={input} onChange={inputHandler} />
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        <img onClick={sendPromptHandler} src={assets.send_icon} alt="" />
                    </div>
                </div>
                <p className="bottom-info">
                    Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
                </p>
        </div>
    );
}