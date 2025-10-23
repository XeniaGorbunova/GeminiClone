import { memo, type FC } from "react";
import { assets } from "../../assets/assets";
import './Greeting.css';

export const Greeting: FC = memo(() => {
    return (
        <>
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
    );
})