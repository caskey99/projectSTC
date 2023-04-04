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
                        <span>{message.timestamp}</span>
                    </div>
                </div>

                <img  className="item-message-info-img-msg" src={img_msg} width="16" height="13" />
                <img  className="item-message-info-img-download" src={img_download} width="14" height="17" />

            </div>
        </div>
    )
}

export default ItemMessage;