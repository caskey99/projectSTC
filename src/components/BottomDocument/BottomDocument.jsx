import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import img from "../img/Vector.svg";
import img_x from "../img/x.svg";
import img_docs from "../img/docs.svg";
import img_infinity from "../img/infinity.svg";
import {setClientIP} from "../../toolkitRedux/toolkitSlice";
import img_msg from "../img/msg.svg";

const BottomDocument = ({ws, closeDoc}) => {
    const dispatch = useDispatch();
    const userIp = useSelector(state => state.toolkit.userIp);
    const clientIp = useSelector(state => state.toolkit.clientIP);
    const document = useSelector(state => state.toolkit.documentBody);

    const [counter, setCounter] = useState(1);
    const [isInfinity, setIsInfinity] = useState(false);
    const [isSendingOptions, setIsSendingOptions] = useState(false);
    const [stopped, setStopped] = useState(false);


    const handleClickMinus = () => {
        if(counter > 1){
            setCounter(counter - 1);
        }
    }
    const handleClickPlus = () => {
        if(counter < 100){
            setCounter(counter + 1);
        }
    }

    ws.getWebsocketClientIp((ipAddress) => {
        dispatch(setClientIP(ipAddress));
    });

    const checkIsInfinity = () => {
        return isInfinity;
    }

    const sendMsg = (userIp) => {
        const date = new Date();
        const hour = date.getHours();
        const minutes = date.getMinutes();
        const time = hour + ":" + minutes;
        const currClient = JSON.parse(sessionStorage.getItem("clients"))
            .filter(element => element.ip === clientIp);
        let nameClient = "noName";
        if (currClient.length === 1)
            nameClient = currClient[0].name

        const obj = {
            method: "sendMessage",
            ipRecipient : userIp,
            ipSender: clientIp,
            id: '',
            nameSender: nameClient,
            message: document,
            body: document,
            date: date,
            timestamp: time,
        }

        for(let i = 0; i < counter; i++){
            ws.getWebsocketClient().send(JSON.stringify(obj));
        }
        closeDoc();
    }

    // const [stop, setStop] = useState(false);
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if (!stop) {
    //             console.log("hello mir");
    //         }
    //         else {
    //         }
    //     }, 1000);
    //     return () => clearInterval(interval);
    // }, [stop]);


    return (
        <div className="bottom-document">
            <div className="left-menu">
                <button className='btn-send-true' onClick={() => {sendMsg(userIp); setIsSendingOptions(false)}}>
                                         <span>
                                            Отправить
                                         </span>
                    <img src={img} alt="Отправка документа"/>
                </button>
                {/*<button className='btn-document'>Документы</button>*/}
            </div>
            <div className="right-menu">
                {!isSendingOptions && (
                    <img src={img_docs}  width="14" height="14" onClick={() => setIsSendingOptions(!isSendingOptions)} />
                )}

                {isSendingOptions && (
                    <img src={img_x}  width="14" height="14" onClick={() => setIsSendingOptions(!isSendingOptions)} />
                )}


                <div className='send-options' style={{ visibility:  isSendingOptions ? "visible" : "hidden" }}>
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

                    <div className="module-infinity" onClick={() => setIsInfinity(!isInfinity)}>
                        <img src={img_infinity} height="20" width="20" />
                    </div>
                    <button className="btn-stop" onClick={() => { setStopped(true);}}  style={{ visibility:  isInfinity ? "visible" : "hidden" }}>
                        Остановить
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BottomDocument;