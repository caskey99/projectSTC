import React, {useEffect, useRef, useState} from "react";
import ItemUser from "../itemUser/ItemUser";
import { Buffer } from 'buffer';
import img from "../img/gearWhee.svg";
import {setNewUserIp} from "../../toolkitRedux/toolkitSlice";
import {useDispatch} from "react-redux";


const ListUser = ({isOpenedSettings, setState}) => {
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
        <aside className="list-users">
            <div className="all-users">
                <input type="checkbox" id="users1" name="users"/>
                <label htmlFor="users1">Пользователи</label>
            </div>
            {sessionStorage.length === 0
                ?
                "выберите пользовтаеля"
                :
                (JSON.parse(sessionStorage.getItem(key))).map(element => <ItemUser key={element.ip} data={element}/>)
            }

            <form>
                <input type="file"
                       onChange={handleOnChange}
                       accept=".json"/>
            </form>

            {isOpenedSettings ?
                <div className="list-users-settings">
                    <div className="list-users-settings-window">
                        <span>IP</span>
                        <input type="text" placeholder="Введите свой ip" onChange={(e) => {userIP = e.target.value}}/>
                        <button onClick={(e) => {dispatch(setNewUserIp(userIP))}}>Сохранить</button>
                    </div>
                </div>
                :
                <div></div>
            }
            <div className="list-users-settings-button">
                <a className="list-users-settings-button-gearWhee " onClick={() => {
                    if (isOpenedSettings === false) setState(true); else setState(false)
                }}>
                    <img src={img} alt="Настройки IP"/>
                </a>
            </div>
        </aside>
    )
}

export default ListUser;