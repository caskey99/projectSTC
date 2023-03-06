import React, {useEffect, useState} from "react";
import ItemUser from "../itemUser/ItemUser";
import ItemMessage from "../ItemMessage/ItemMessage";
import {useSelector} from "react-redux";
const os = require('os');


const Messages = ({OpenDoc, curMessage}) => {

    const valuesMsg = useSelector(state => state.toolkit.valuesMsg);

    return (
        <aside className="messages-list">
            <h1 className="messages-list-header">Входящие сообщения</h1>
            <div className="messages-list-items">
                {
                    valuesMsg.length === 0
                    ?
                        "пока пусто"
                    :
                        valuesMsg.map(msg => <ItemMessage message={JSON.parse(msg)}  curMessage={curMessage} OpenDoc={OpenDoc} key={msg.id} />)
                }
            </div>
        </aside>
    )
}

export default Messages;