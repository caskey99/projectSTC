import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentMessage} from "../../toolkitRedux/toolkitSlice";
import img_doc from "../img/doc.svg";
import img_msg from "../img/msg.svg";
import img_download from "../img/download.svg";



const ItemMessage = ({message, OpenDoc}) => {

    const dispatch = useDispatch();
    let currentMessage = null;

    const openDocument = async () => {
        OpenDoc();
    }

    const dispatchMessage = async (message) => {
        // dispatch(setCurrentMessage(message));
        currentMessage = message;
    }


    const  read = (currentMessage) => {
        document.getElementById("message").value = currentMessage.message;
    }
    console.log(JSON.stringify(message))

    const formatMessageTime = (timestamp) => {
        const currentDate = new Date() ;
        const messageDate = new Date(timestamp);

        //const date1 = new Date('2023-04-09T00:00:00.000Z');
        const sameYear = currentDate.getFullYear() === messageDate.getFullYear();
        const sameMonth = currentDate.getMonth() === messageDate.getMonth();
        const sameDay = currentDate.getDate() === messageDate.getDate();

        if (sameYear && sameMonth && sameDay) {
            return `Сегодня ${messageDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`;
        } else if (sameYear && sameMonth && currentDate.getDate() - messageDate.getDate() === 1) {
            return `Вчера ${messageDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`;
        } else {
            return `${messageDate.getDate()} ${messageDate.toLocaleString('ru-RU', { month: 'long' })} в ${messageDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`;
        }
    }

    return (
        <div className='message-field'>
            <div className="item-message" onClick={() => {
                openDocument().then(() => {
                    dispatchMessage(message)
                        .then(() => {
                            read(currentMessage)
                        })
                })
            }}>
                <img  className="item-message-info-img-doc" src={img_doc} width="16" height="20" />
                <div className="item-message-info">

                    {/*<div className="item-message-info-id">*/}
                    {/*    <span>ID {message.id}</span>*/}
                    {/*</div>*/}
                    <div className="item-message-info-content">
                        <span>{message.message}</span>
                    </div>
                    <div className="item-message-info-time">
                        <span>{formatMessageTime(message.date)}</span>
                    </div>
                </div>

                {/*<img  className="item-message-info-img-msg" src={img_msg} width="16" height="13" />*/}
                <div className="item-message-info-img-msg" ></div>
                {/*<img  className="item-message-info-img-download" src={img_download} width="14" height="17" />*/}

            </div>
        </div>
    )
}

export default ItemMessage;