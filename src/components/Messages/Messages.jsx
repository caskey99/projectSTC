import React, {useEffect, useState} from "react";
import ItemUser from "../itemUser/ItemUser";
import ItemMessage from "../ItemMessage/ItemMessage";
import {useDispatch, useSelector} from "react-redux";
const os = require('os');
import img_search from "../img/search.svg";
import img_filter from "../img/filter.svg";
import {setClientIP, setSearchUser, setUserIp, setValueMsg} from "../../toolkitRedux/toolkitSlice";


const Messages = ({OpenDoc, ws}) => {

    const dispatch = useDispatch();
    const clientIp = useSelector(state => state.toolkit.clientIP);
    const valuesMsg = useSelector(state => state.toolkit.valuesMsg);
    const valueUsers = useSelector(state => state.toolkit.searchUser);
    const [swap, setSwap] = useState(false);
    const [numIncoming, setNumIncoming] = useState(0);
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [sortByTime, setSortByTime] = useState(false);

    const drawMessages = (valuesMsgArr) => {
        const res = []
        if(swap) {
            valuesMsgArr.map(msg => {
                if (JSON.parse(msg).ipRecipient !== clientIp) {
                    res.push(<ItemMessage message={JSON.parse(msg)} OpenDoc={OpenDoc} key={JSON.parse(msg).id}/>)
                }
            });
        }
        else {
            valuesMsgArr.map(msg => {
                if (JSON.parse(msg).ipRecipient === clientIp) {
                    res.push(<ItemMessage message={JSON.parse(msg)} OpenDoc={OpenDoc} key={JSON.parse(msg).id}/>)
                }
            });
        }

        return res;
    }

    function handleChangeIncoming()  {
        setSwap(false);
    }

    function handleChangeOutgoing()  {
        setSwap(true);
    }

    useEffect(() => {
        setNumIncoming(valuesMsg.length);
    }, [numIncoming])



    // ws.getWebsocketClientIp((ipAddress) => {
    //     dispatch(setClientIP(ipAddress));
    // });

    const filterMenu = () => {
        setIsOpenFilter(!isOpenFilter);
    };


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
            <div className="messages-list-search"
                 style={{
                     borderBottom: isOpenFilter ? '1px solid white' : '1px solid #C8CACC'
                 }}
            >
                <form>
                    <img className="messages-list-search-img-search"  alt="" src={img_search}/>
                    <input type="search" aria-label="Search" placeholder="Введите запрос"
                           value={valueUsers.query}
                           onChange={e => dispatch(setSearchUser({...valueUsers, query: e.target.value}))}
                    />
                    <div className="messages-list-search-img-filter" onClick={filterMenu}>
                        <img alt="" src={img_filter} />
                    </div>
                </form>
            </div>

            {isOpenFilter && (
                <div className="messages-list-search-filter-box">
                    <div className="messages-list-search-filter-box-item" onClick={ () => {sortByTime ? setSortByTime(false) : setSortByTime(true)} }>По времени</div>
                    <div className="messages-list-search-filter-box-item">По собеседнику</div>
                </div>
            )}
            {
                swap
            ?
                    (
                        <div className="messages-list-outgoing">
                            <div className="messages-list-outgoing-items">
                                {
                                    localStorage.length === 1
                                        ?
                                        "пока пусто"
                                        :

                                        sortByTime
                                            ?
                                            valueUsers.query
                                                ?
                                                drawMessages([...valuesMsg].reverse().filter(msg => JSON.parse(msg).nameSender.toLowerCase().includes(valueUsers.query.toLowerCase())))
                                                :
                                                drawMessages( [...valuesMsg].reverse())
                                            :

                                            valueUsers.query
                                                ?
                                                drawMessages([...valuesMsg].filter(msg => JSON.parse(msg).nameSender.toLowerCase().includes(valueUsers.query.toLowerCase())))
                                                :
                                                drawMessages([...valuesMsg])


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

                                        sortByTime
                                            ?
                                            valueUsers.query
                                                ?
                                                drawMessages([...valuesMsg].reverse().filter(msg => JSON.parse(msg).nameSender.toLowerCase().includes(valueUsers.query.toLowerCase())))
                                                :
                                                drawMessages( [...valuesMsg].reverse())
                                            :

                                            valueUsers.query
                                                ?
                                                drawMessages([...valuesMsg].filter(msg => JSON.parse(msg).nameSender.toLowerCase().includes(valueUsers.query.toLowerCase())))
                                                :
                                                drawMessages([...valuesMsg])

                                        // <ItemMessage message={JSON.parse("{\"method\":\"sendMessage\",\"ipRecipient\":[\"192.168.31.14\"],\"ipSender\":\"\",\"ipCurr\":\"192.168.31.14\",\"id\":0,\"message\":\"Донесение на РБ-108С\",\"timestamp\":\"13:59\"}")}/>

                                }
                            </div>
                        </div>
                    )
            }
        </aside>


    )
}

export default Messages;