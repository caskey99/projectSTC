import React from 'react';
import {useDispatch} from "react-redux";
import {setUserIp} from "../../toolkitRedux/toolkitSlice";

const ItemUser = ({data}) => {
    const dispatch = useDispatch()
    return (
        <div className="item-user">
            <input type="checkbox" id={data.ip} name="users" onClick={() => {dispatch(setUserIp(data.ip)) ; console.log(data.ip)}}/>
            <label htmlFor={data.ip}>
                <div className="title-user">
                    <span className="naming">{data.name}</span>
                    <span className="job">{data.ip}</span>
                </div>
            </label>
            <div className="counter-cycle">

            </div>
        </div>
    )
}

export default ItemUser;