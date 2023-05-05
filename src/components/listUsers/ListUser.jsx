import React, {useEffect, useRef, useState} from "react";
import ItemUser from "../itemUser/ItemUser";
import ItemUserOptions from "../itemUserOptions/ItemUserOptions";
import { Buffer } from 'buffer';
import img from "../img/gearWhee.svg";
import {setNewUserIp, setSearchVal} from "../../toolkitRedux/toolkitSlice";
import {useDispatch, useSelector} from "react-redux";


const ListUser = ({openDoc, closeDoc, isOpenedSettings, setState, createWebsocketClient}) => {
    const dispatch = useDispatch();
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
        <aside className="field-users">

            <div className="all-users">
                <h1>Пользователи</h1>
            </div>

            {sessionStorage.getItem(key) === null
                ?
                (<div className="file-input">
                        <input type="file"
                               className="file"
                               onChange={handleOnChange}
                               accept=".json"/>
                    </div>
                )
                :
                (<div className="list-users">
                    {JSON.parse(sessionStorage.getItem(key)).map(element =>
                        (
                            <ItemUser openDoc={openDoc} closeDoc={closeDoc} key={element.ip} data={element} />
                        )
                    )}
                </div>)
            }
        </aside>
    )
}

export default ListUser;