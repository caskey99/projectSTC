import React, {useEffect, useState} from "react";
import ItemMessage from "../ItemMessage/ItemMessage";
import {useDispatch, useSelector} from "react-redux";
const os = require('os');
import img_search from "../img/search.svg";
import img_filter from "../img/filter.svg";
import {setSearchUser} from "../../toolkitRedux/toolkitSlice";
import { DatePicker } from 'antd';

const listMessages = ({OpenDoc, closeDoc}) => {

    const dispatch = useDispatch();
    const clientIp = useSelector(state => state.toolkit.clientIP);
    const valuesMsg = useSelector(state => state.toolkit.valuesMsg);
    const valueUsers = useSelector(state => state.toolkit.searchUser);
    const [swapMessageTab, setSwapMessageTab] = useState(false);
    const [numIncoming, setNumIncoming] = useState("0");
    const [numOutgoing, setNumOutgoing] = useState(0);
    const [isOpenFilter, setIsOpenFilter] = useState(false);

    // useEffect(() => {
    //     checkNumIncoming();
    // }, [valuesMsg]);


    const drawMessages = (valuesMsgArr) => {
        const res = [];
        // console.log(valuesMsgArr);
        if (Array.isArray(valuesMsgArr) && valuesMsgArr.length > 0) {
            if(swapMessageTab) {
                valuesMsgArr.map(msg => {
                    if (JSON.parse(msg).ipRecipient !== clientIp) {
                        res.push(<ItemMessage message={JSON.parse(msg)} OpenDoc={OpenDoc} closeDoc={closeDoc} key={JSON.parse(msg).id}/>)
                    }
                });
            }
            else {
                valuesMsgArr.map(msg => {
                    if (JSON.parse(msg).ipRecipient === clientIp) {
                        res.push(<ItemMessage message={JSON.parse(msg)} OpenDoc={OpenDoc} closeDoc={closeDoc} key={JSON.parse(msg).id}/>)
                    }
                });
            }
        }

        return res;
    }

    function handleChangeIncoming()  {
        setSwapMessageTab(false);
    }

    function handleChangeOutgoing()  {
        setSwapMessageTab(true);
    }

    const filterMenu = () => {
        setIsOpenFilter(!isOpenFilter);
        setOpenFilterByTime(false);
        setStartDate(null);
        setEndDate(null);
    };
    const [openFilterByTime, setOpenFilterByTime] = useState(false);
    const [sortByTime, setSortByTime] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleFilter = (arr) => {
        const filtered = [...arr].filter((message) => {
                const date = new Date (JSON.parse(message).date).getTime();
                if(startDate !== null && endDate !== null){
                    return date >= startDate && date <= endDate;
                }
                else if(startDate !== null)
                    return date >= startDate;
                else if(endDate !== null)
                    return date <= endDate;
                else {
                    return date;
                }
            });
        return [...filtered];
    };

    return (
        <aside className="messages-list">
            <h1 className="messages-list-header">Документы</h1>
            <div className="messages-list-buttons-switching">
                <button className="button-incoming" onClick={handleChangeIncoming}
                        style={{ backgroundColor:  swapMessageTab ? "#EBECEC" : "#FFFFFF" }}>
                    Входящие
                    <div className="counter-cycle">
                        <div className="counter-cycle-num"> {numIncoming} </div>
                    </div>
                </button>
                <button className="button-sent" onClick={handleChangeOutgoing}
                        style={{ backgroundColor:  swapMessageTab ? "#FFFFFF" : "#EBECEC" }}>
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
                    <div className="messages-list-search-filter-box-item" onClick={ () => {openFilterByTime ? setOpenFilterByTime(false) : setOpenFilterByTime(true)} }>По времени</div>
                    <div className="messages-list-search-filter-box-item">По собеседнику</div>
                </div>
            )}
            {isOpenFilter && openFilterByTime && (
                <div style={{ width: '332px', height: '48px', display: 'flex', justifyContent: 'center' }}>
                    <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
                        <DatePicker style={{height: '32px'}} value={startDate} onChange={(date) => {setStartDate(date); setSortByTime(true)}} />
                        <DatePicker style={{height: '32px'}} value={endDate} onChange={(date) => {setEndDate(date); setSortByTime(true)}} />
                    </div>
                </div>
            )}
            {
                swapMessageTab
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
                                                drawMessages(handleFilter(valuesMsg).filter(msg => JSON.parse(msg).nameSender.toLowerCase().includes(valueUsers.query.toLowerCase())))
                                                :
                                                drawMessages(handleFilter(valuesMsg))
                                            :

                                            valueUsers.query
                                                ?
                                                drawMessages([...valuesMsg].filter(msg => JSON.parse(msg).nameSender.toLowerCase().includes(valueUsers.query.toLowerCase())))
                                                :
                                                drawMessages([...valuesMsg])
                                }
                            </div>
                        </div>
                    )
                :
                    (
                        <div className="messages-list-incoming">
                            <div className="messages-list-incoming-items">
                                {
                                    localStorage.length === 1
                                        ?
                                        "пока пусто"
                                        :
                                        sortByTime
                                            ?
                                            valueUsers.query
                                                ?
                                                drawMessages(handleFilter(valuesMsg).filter(msg => JSON.parse(msg).nameSender.toLowerCase().includes(valueUsers.query.toLowerCase())))
                                                :
                                                drawMessages(handleFilter(valuesMsg))
                                            :

                                            valueUsers.query
                                                ?
                                                drawMessages([...valuesMsg].filter(msg => JSON.parse(msg).nameSender.toLowerCase().includes(valueUsers.query.toLowerCase())))
                                                :
                                                drawMessages([...valuesMsg])
                                }
                            </div>
                        </div>
                    )
            }
        </aside>


    )
}

export default listMessages;