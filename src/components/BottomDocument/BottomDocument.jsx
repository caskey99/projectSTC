import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import img from "../img/Vector.svg";
import img_x from "../img/x.svg";
import img_docs from "../img/docs.svg";
import {setClientIP} from "../../toolkitRedux/toolkitSlice";

const BottomDocument = ({ws}) => {
    const dispatch = useDispatch();
    const userIp = useSelector(state => state.toolkit.userIp);
    const valueDoc = useSelector(state => state.toolkit.valueDoc);
    const clientIp = useSelector(state => state.toolkit.clientIP);

    const [counter, setCounter] = useState(1);

    const handleClickMinus = () => {
        if(counter > 0);
            setCounter(counter - 1);
    }
    const handleClickPlus = () => {
        if(counter < 100);
            setCounter(counter + 1);
    }

    ws.getWebsocketClientIp((ipAddress) => {
        dispatch(setClientIP(ipAddress));
    });


    const sendMsg = (userIp, valueDoc) => {
        const date = new Date();
        const hour = date.getHours();
        const minutes = date.getMinutes();
        const time = hour + ":" + minutes;
        console.log(time);
        const currClient = JSON.parse(sessionStorage.getItem("clients")).filter(element => element.ip === clientIp);
        let nameClient = "noName";
        if (currClient.length === 1)
            nameClient = currClient[0].name

        const obj = {
            method: "sendMessage",
            ipRecipient : userIp,
            ipSender: clientIp,
            ipCurr: '',
            id: '',
            nameSender: nameClient,
            message: valueDoc,
            date: date,
            timestamp: time,
        }
        ws.getWebsocketClient().send(JSON.stringify(obj));
    }

    return (
        <div className="bottom-document">
            <div className="left-menu">
                <button className='btn-send-true' onClick={() => {sendMsg(userIp, valueDoc)}}>
                                         <span>
                                            Отправить
                                         </span>
                    <img src={img} alt="Отправка документа"/>
                </button>
                {/*<button className='btn-document'>Документы</button>*/}
            </div>
            <div className="right-menu">
                <img src={img_docs}  width="14" height="14"  />
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
            </div>
        </div>
    )
}

export default BottomDocument;