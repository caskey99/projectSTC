import React, {useEffect, useState} from "react";
import ItemUser from "../itemUser/ItemUser";
import ItemMessage from "../ItemMessage/ItemMessage";
import {useDispatch, useSelector} from "react-redux";
const os = require('os');
import img_search from "../img/search.svg";
import img_filter from "../img/filter.svg";
import {setClientIP, setSearchUser, setUserIp} from "../../toolkitRedux/toolkitSlice";


const Messages = ({OpenDoc, ws}) => {

    const dispatch = useDispatch();
    const clientIp = useSelector(state => state.toolkit.clientIP);
    const valuesMsg = useSelector(state => state.toolkit.valuesMsg);
    const valueUsers = useSelector(state => state.toolkit.searchUser);
    const [swap, setSwap] = useState(false);
    const [numIncoming, setNumIncoming] = useState(0);


    function handleChangeIncoming()  {
        setSwap(false);
    }

    function handleChangeOutgoing()  {
        setSwap(true);
    }

    useEffect(() => {
        setNumIncoming(valuesMsg.length)
    }, [numIncoming])



    // ws.getWebsocketClientIp((ipAddress) => {
    //     dispatch(setClientIP(ipAddress));
    // });


    return (
        <aside className="messages-list">
            <h1 className="messages-list-header">Документы</h1>
            <div className="messages-list-buttons-switching">
                <button className="button-incoming" onClick={handleChangeIncoming}
                        style={{ backgroundColor:  swap ? "#EBECEC" : "#FFFFFF" }}>
                    Входящие
                    <div className="counter-cycle">
                        <div className="counter-cycle-num"> {numIncoming} </div>
                    </div>
                </button>
                <button className="button-sent" onClick={handleChangeOutgoing}
                        style={{ backgroundColor:  swap ? "#FFFFFF" : "#EBECEC" }}>
                    Отправленные
                </button>
            </div>
            <div className="messages-list-search">
                <form>
                    <img className="messages-list-search-img-search"  alt="" src={img_search}/>
                    <input type="search" aria-label="Search" placeholder="Введите запрос"
                           value={valueUsers.query}
                           onChange={e => dispatch(setSearchUser({...valueUsers, query: e.target.value}))}
                    />
                    <img className="messages-list-search-img-filter" alt="" src={img_filter}/>
                </form>
            </div>
            {
                swap
            ?
                    (
                        <div className="messages-list-outgoing">
                            <div className="messages-list-outgoing-items">
                                {
                                    localStorage.length === 1
                                    //valuesMsg.length === 0
                                        ?
                                        "пока пусто"
                                        :

                                        valueUsers.query
                                            ?
                                            valuesMsg.filter(msg => JSON.parse(msg).nameSender.toLowerCase().includes(valueUsers.query.toLowerCase())).map(msg =>
                                                {
                                                    if (JSON.parse(msg).ipRecipient !== clientIp) {
                                                        return <ItemMessage message={JSON.parse(msg)} OpenDoc={OpenDoc} key={msg.id} />
                                                    }
                                                }
                                            )
                                            :
                                            valuesMsg.map(msg =>
                                                {
                                                    if (JSON.parse(msg).ipRecipient !== clientIp) {
                                                        return <ItemMessage message={JSON.parse(msg)} OpenDoc={OpenDoc} key={msg.id} />
                                                    }
                                                }
                                            )

                                        // valuesMsg.map(msg => console.log(msg))
                                         //valuesMsg.map(msg => <ItemMessage message={JSON.parse(msg)} OpenDoc={OpenDoc} key={msg.id} />)
                                    //(<ItemMessage message={JSON.parse("{\"method\":\"sendMessage\",\"ipRecipient\":[\"192.168.31.14\"],\"ipSender\":\"\",\"ipCurr\":\"192.168.31.14\",\"id\":0,\"message\":\"Донесение на РБ-100С\",\"timestamp\":\"13:59\"}")} />)
                                }
                            </div>
                        </div>
                    )
                :
                    (
                        <div className="messages-list-incoming">
                            <div className="messages-list-incoming-items">
                                {
                                    // valuesMsg.length === 0
                                    localStorage.length === 1
                                        ?
                                        "пока пусто"
                                        :

                                        valueUsers.query
                                            ?
                                            valuesMsg.filter(msg => JSON.parse(msg).nameSender.toLowerCase().includes(valueUsers.query.toLowerCase())).map(msg =>
                                                {
                                                    if (JSON.parse(msg).ipRecipient === clientIp) {
                                                        return <ItemMessage message={JSON.parse(msg)} OpenDoc={OpenDoc} key={msg.id} />
                                                    }
                                                }
                                            )
                                            :
                                            valuesMsg.map(msg =>
                                                {
                                                    if (JSON.parse(msg).ipRecipient === clientIp) {
                                                        return <ItemMessage message={JSON.parse(msg)} OpenDoc={OpenDoc} key={msg.id} />
                                                    }
                                                }
                                            )

                                        // <ItemMessage message={JSON.parse("{\"method\":\"sendMessage\",\"ipRecipient\":[\"192.168.31.14\"],\"ipSender\":\"\",\"ipCurr\":\"192.168.31.14\",\"id\":0,\"message\":\"Донесение на РБ-108С\",\"timestamp\":\"13:59\"}")}/>
                                        //
                                        // valuesMsg.map(msg =>
                                        //     {
                                        //         if (JSON.parse(msg).ipRecipient === clientIp) {
                                        //             return <ItemMessage message={JSON.parse(msg)} OpenDoc={OpenDoc} key={msg.id} />
                                        //         }
                                        //     }
                                        // )

                                    //valuesMsg.map(msg => <ItemMessage message={JSON.parse(msg)} OpenDoc={OpenDoc} key={msg.id} />)
                                }
                            </div>
                        </div>
                    )
            }
        </aside>


    )
}

export default Messages;