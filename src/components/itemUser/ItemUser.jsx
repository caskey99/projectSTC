import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from "react-redux";
import {setUserIp} from "../../toolkitRedux/toolkitSlice";
import ItemUserOptions from "../itemUserOptions/ItemUserOptions";
import {Buffer} from "buffer";

const ItemUser = ({data, openDoc,closeDoc}) => {

    const dispatch = useDispatch();
    const dropdownRef = useRef();
    const [value, setValue] = useState(data.name);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

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


    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const handleEditSubmit = (value) => {
        const clients = JSON.parse(sessionStorage.getItem('clients'));
        console.log(clients)
        if(clients)
        {
            sessionStorage.setItem('clients', JSON.stringify(clients.map(client => {
                if(client.ip === data.ip){
                    client.name = value;
                    return client;
                }
                return client;
            })));
            location.reload();
        }
    };

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            handleEditSubmit(value);
            event.target.blur();
        }
    }

    const drawTitleUser = () => {
        const res = [];
        if(isEditing)
            res.push(<input className="naming" value={value} onChange={handleChange} onKeyUp={handleKeyPress}></input>, <span className="job">{data.post}</span>)
        else
            res.push(<span className="naming">{data.name}</span>, <span className="job">{data.post}</span>)
        return res
    }

    return (
        <div className="item-user">
            <input type="checkbox" id={data.ip} name="users" onClick={() => {dispatch(setUserIp(data.ip)) ; console.log(data.ip)}}/>
            <label htmlFor={data.ip}>
                <div className="title-user">
                    {
                        isEditing
                            ?
                            drawTitleUser()
                            :
                            drawTitleUser()

                    }
                </div>
            </label>
            <div className="counter-cycle" onClick={() => setIsMenuOpen(oldState => !oldState)}></div>
            <div className="wrapper" ref={dropdownRef}>
                {isMenuOpen && (
                    <ItemUserOptions >
                        <ul className="item-list">
                            <li className="list-item" onClick={ () => { setIsEditing(!isEditing)}}>Редактировать данные</li>
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