import React, {useEffect, useRef, useState} from "react";
import ItemUser from "../itemUser/ItemUser";
import { Buffer } from 'buffer';
import img from "../img/gearWhee.svg";
import {setNewUserIp, setSearchVal} from "../../toolkitRedux/toolkitSlice";
import {useDispatch, useSelector} from "react-redux";


const ListUser = ({isOpenedSettings, setState, createWebsocketClient}) => {
    const dispatch = useDispatch();
    const valueSearch = useSelector(state => state.toolkit.searchVal);
    let userIP = null;
    const key = 'clients';
    const [update, setUpdate] = useState(true);
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
        const obj = JSON.parse(JSON.stringify(fileReader.result));
        const json = Buffer.from(obj.substring(29), "base64").toString();
        const result = JSON.parse(json);
        sessionStorage.setItem(key, JSON.stringify(result));
        setUpdate(false);
    };

    fileReader.addEventListener('progress', (event) => { /* Процент загрузки json файла в console */
        if (event.loaded && event.total) {
            const percent = (event.loaded / event.total) * 100;
            console.log(`Progress: ${Math.round(percent)}`);
        }
    });

    const handleOnChange = (event) => {
        event.preventDefault();
        const clients2 = event.target.files[0];
        fileReader.readAsDataURL(clients2);
    }

    return (
        <aside className="list-users">
            <div className="all-users">
                {/*<input type="checkbox" id="users1" name="users"/>*/}
                {/*<label htmlFor="users1">Пользователи</label>*/}
                <h1>Пользователи</h1>
            </div>

            {/*<div className="search-users">*/}
            {/*    <form>*/}
            {/*        <input type="search" aria-label="Search" placeholder="Искать здесь..."*/}
            {/*           value={valueSearch.query}*/}
            {/*           onChange={e => dispatch(setSearchVal({...valueSearch, query: e.target.value}))}*/}
            {/*        />*/}
            {/*    </form>*/}
            {/*</div>*/}

            {sessionStorage.length === 0
                ?
                (<div className="file-input">
                    <input type="file"
                           className="file"
                           onChange={handleOnChange}
                           accept=".json"/>
                </div>
                )
                :
                valueSearch.query
                    ?
                    (JSON.parse(sessionStorage.getItem(key))).filter(element => element.name.toLowerCase().includes(valueSearch.query.toLowerCase()))
                        .map(element => <ItemUser key={element.ip} data={element}/>)
                    :
                    (JSON.parse(sessionStorage.getItem(key))).map(element => <ItemUser key={element.ip} data={element}/>)
            }

        </aside>
    )
}

export default ListUser;