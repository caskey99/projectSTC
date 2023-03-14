import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentMessage} from "../../toolkitRedux/toolkitSlice";


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
                <div className="item-message-info">
                    <div className="item-message-info-id">
                        <span>ID {message.id}</span>
                    </div>
                    <div className="item-message-info-time">
                        <span>{message.timestamp}</span>
                    </div>
                </div>
                <div className="item-message-content">
                    <span>{message.message}</span>
                </div>
            </div>
        </div>
    )
}

export default ItemMessage;