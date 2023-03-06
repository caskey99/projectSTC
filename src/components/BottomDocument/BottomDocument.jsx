import React, {useState} from 'react';
import {useSelector} from "react-redux";
import img from "../img/Vector.svg";

const BottomDocument = ({ws}) => {
    const userIp = useSelector(state => state.toolkit.userIp)
    const valueDoc = useSelector(state => state.toolkit.valueDoc)

    const [counter, setCounter] = useState(1);

    const handleClickMinus = () => {
        if(counter > 0)
            setCounter(counter - 1)
    }
    const handleClickPlus = () => {
        if(counter < 100)
            setCounter(counter + 1)
    }


    const sendMsg = (userIp, valueDoc) => {
        const date = new Date();
        const hour = date.getHours();
        const minutes = date.getMinutes();
        const time = hour + ":" + minutes;
        console.log(time);
        const obj = {
            method: "sendMessage",
            ipRecipient : userIp,
            ipSender: '',
            ipCurr: '',
            id: '',
            message: valueDoc,
            timestamp: time,
        }
        ws.getWebsocketClient().send(JSON.stringify(obj));
    }

    return (
        <div className="bottom-document">
            <div className="left-menu">
                <button className='btn-document'>Документы</button>
            </div>
            <div className="right-menu">
                <p>Колличесвто отправок</p>
                <div className='box-spinner'>
                    <div className='in-num'> {counter}</div>
                    <div className="module-strip"/>
                    <div className="module-minus" onClick={() => handleClickMinus()}>
                        <div className="minus"/>
                    </div>
                    <div className="module-plus" onClick={() => handleClickPlus()}>
                        <div className="plus"/>
                    </div>
                </div>
                {/*<button disabled className='btn-send'>Отправить</button>*/}
                <button className='btn-send-true' onClick={() => {sendMsg(userIp, valueDoc)}}>
                                         <span>
                                            Отправить
                                         </span>
                    <img src={img} alt="Отправка документа"/>
                </button>
            </div>
        </div>
    )
}

export default BottomDocument;