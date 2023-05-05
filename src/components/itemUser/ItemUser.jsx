import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from "react-redux";
import {setDocument, setUserIp} from "../../toolkitRedux/toolkitSlice";
import ItemUserOptions from "../itemUserOptions/ItemUserOptions";
import {Buffer} from "buffer";

const ItemUser = ({data, openDoc,closeDoc}) => {

    const dispatch = useDispatch();
    const dropdownRef = useRef();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [dataFile, setDataFile] = useState();
    const fileInputRef = useRef(null);
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
        const obj = JSON.parse(JSON.stringify(fileReader.result));
        const json = Buffer.from(obj.substring(29), "base64").toString();
        const result = JSON.parse(json);
        setDataFile(result);
        // console.log("onloadend " + json);
        dispatch(setDocument(json));
        closeDoc();
        openDoc();

    };

    function handleFileSelect(event) {
        event.preventDefault();
        const fileList = event.target.files[0];
        fileReader.readAsDataURL(fileList);
    }

    function handleClick() {
        fileInputRef.current.click();
    }


    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (isMenuOpen && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isMenuOpen])

    return (
        <div className="item-user">
            <input type="checkbox" id={data.ip} name="users" onClick={() => {dispatch(setUserIp(data.ip)) ; console.log(data.ip)}}/>
            <label htmlFor={data.ip}>
                <div className="title-user">
                    <span className="naming">{data.name}</span>
                    <span className="job">{data.post}</span>
                    {/*<span className="job">{data.ip}</span>*/}
                </div>
            </label>
            <div className="counter-cycle" onClick={() => setIsMenuOpen(oldState => !oldState)}></div>
            <div className="wrapper" ref={dropdownRef}>
                {isMenuOpen && (
                    <ItemUserOptions >
                        <ul className="item-list">
                            <li className="list-item" onClick={handleClick}>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={fileInputRef}
                                    onChange={handleFileSelect}
                                />
                                    <p>Открыть папку с документами</p>
                            </li>
                            <li className="list-item">Редактировать данные</li>
                            <li className="list-item" onClick={() => {
                                const clients = JSON.parse(sessionStorage.getItem('clients'));
                                if(clients)
                                {
                                    sessionStorage.setItem('clients', JSON.stringify(clients.filter(client => client.ip !== data.ip)));
                                    location.reload();
                                }
                            }}>Удалить пользователя</li>
                        </ul>
                    </ItemUserOptions>
                )}
            </div>
        </div>
    )
}

export default ItemUser;