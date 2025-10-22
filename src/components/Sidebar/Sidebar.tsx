import { useContext, useState, type FC } from "react";
import './sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from "../../context/Context";
import React from "react";

export const Sidebar: FC = React.memo(() => {
    console.log('Sidebar');
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

    const loadPrompt = async (prompt: string) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    }

    const collapseMenuHandler = () => setExtended((prev) => !prev);

    return (
        <div className="sidebar">
            <div className="top">
                <img className="menu" src={assets.menu_icon} alt="menu" onClick={collapseMenuHandler} />
                <div onClick={() => newChat()} className="new-chat">
                    <img src={assets.plus_icon} alt="new chat" />
                    { extended ? <p>New Chat</p> : null}
                </div>
                { extended ? 
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompts.map((prompt: string, index: number) => {
                            return (
                            <div key={index} onClick={() => loadPrompt(prompt)} className="recent-entry">
                                <img src={assets.message_icon} alt="message" />
                                <p>{prompt.slice(0, 18)} ...</p>
                            </div>
                            )
                        })}
                    </div>
                    : null
                }    
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    )
})