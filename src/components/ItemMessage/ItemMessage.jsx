import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentMessage} from "../../toolkitRedux/toolkitSlice";


const ItemMessage = ({message, OpenDoc, curMessage}) => {

    const dispatch = useDispatch();
    const currentMessage = useSelector(state => state.toolkit.currentMessage);

    const  read = (currentMessage) => {
        document.getElementById("message").value = currentMessage.message
    }

    const openDocument = async () => {
        OpenDoc();
    }

    const dispatchMessage = async () => {
        dispatch(setCurrentMessage(message));
    }




    dispatch(setCurrentMessage(message))

    return (
        <div className='message-field'>
            <div className="item-message" onClick={() => {
                openDocument().then(() => {
                    dispatchMessage()
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