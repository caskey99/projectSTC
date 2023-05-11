import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentMessage} from "../../toolkitRedux/toolkitSlice";
import img_doc from "../img/doc.svg";
import img_msg from "../img/msg.svg";
import img_download from "../img/download.svg";

const ItemMessage = ({message, OpenDoc, closeDoc}) => {
    const [showDownload, setShowDownload] = useState(false);
    const dispatch = useDispatch();


    const onMouseOver = () => {
        setShowDownload(true);
    };

    const onMouseLeave = () => {
        setShowDownload(false);
    };


    const openDocument = async () => {
        closeDoc();
        OpenDoc();
    }

    const dispatchMessage = async (message) => {
        dispatch(setCurrentMessage(JSON.stringify(message)));
    }


    const  read = () => {
        // document.getElementById("message").value = currentMessage.message;
    }
    // console.log(JSON.stringify(message))

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


    const handleClickDownload = (e) => {
        e.stopPropagation();
        const blob = new Blob([message.body], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'document.json';
        link.click();
    };


        return (
        <div className='message-field'>
            <div className="item-message" onClick={() => {
                dispatchMessage(message).then(() => {
                    openDocument()
                        .then(() => {
                            read()
                        })
                })
            }}>
                <img  className="item-message-info-img-doc" src={img_doc} width="16" height="20" />
                <div className="item-message-info">
                    <div className="item-message-info-content">
                        {message.body
                        ?
                            <span>{JSON.parse(message.body).name}</span>
                        :
                            <span>{message.message()}</span>
                        }
                    </div>
                    <div className="item-message-info-time">
                        <span>{formatMessageTime(message.date)}</span>
                    </div>
                </div>

                <div className="item-message-info-img" onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
                    {!showDownload && (
                        <img  className="item-message-info-img-msg" src={img_msg} width="16" height="13"  />
                    )}
                    {showDownload && (
                        <img  className="item-message-info-img-download" src={img_download} width="14" height="17" onClick={handleClickDownload}/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ItemMessage;