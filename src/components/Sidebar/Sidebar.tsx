import { memo, useContext, useState, type FC } from "react";
import './sidebar.css';
import { assets } from '../../assets/assets';
import { AppContext } from "../../context/Context";
import { localStorageHandler } from "../../helpers/LocalStorageHandler";

export const Sidebar: FC = memo(() => {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, newChat, setPrevPrompts } = useContext(AppContext);

    const loadPrompt = async (prompt: string) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    }

    const deletePrompt = (e: React.MouseEvent<HTMLImageElement>, prompt: string) => {
        e.stopPropagation();

        const filteredPrompts = prevPrompts.filter((item: string) => item !== prompt);
        setPrevPrompts(filteredPrompts);
        localStorageHandler.savePrevPrompts(filteredPrompts);
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
                        <div className="recent-entries">
                            {prevPrompts.map((prompt: string, index: number) => {
                            return (
                            <div key={index} onClick={() => loadPrompt(prompt)} className="recent-entry">
                                <div className="recent-entry-text">
                                    <img src={assets.message_icon} alt="message" />
                                    <p>{prompt.slice(0, 18)} ...</p>
                                </div>
                                <img className="trash-icon" src={assets.trash_icon} alt="delete" onClick={(e) => deletePrompt(e, prompt)} />
                            </div>
                            )
                        })}
                        </div>
                    </div>
                    : null
                }    
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry recent-entry-text">
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry recent-entry-text">
                    <img src={assets.history_icon} alt="" />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry recent-entry-text">
                    <img src={assets.setting_icon} alt="" />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    )
})