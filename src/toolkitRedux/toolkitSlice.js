import {createSlice} from "@reduxjs/toolkit";

const toolkitSlice = createSlice({
    name: "toolkit",
    initialState: {
        userIp: '',
        newUserIp: '',
        clientIP: '',
        valueDoc: '',
        valuesMsg: [],
        currentMessage: '',
        // searchVal: {query1:''},
        searchUser: {query:''},
    },
    reducers: {
        setUserIp(state, action){
            state.userIp = action.payload;
        },
        setNewUserIp(state, action){
            state.newUserIp = action.payload;
        },
        setClientIP(state, action){
            state.clientIP = action.payload;
        },
        setValueDoc(state, action){
            state.valueDoc = action.payload
        },
        setValueMsg(state, action) {
            state.valuesMsg.push(action.payload);
        },
        setCurrentMessage(state, action) {
            state.currentMessage = action.payload;
        },
        // setSearchVal(state, action){
        //     state.searchVal = action.payload;
        //     console.log(action.payload)
        // },
        setSearchUser(state, action){
            state.searchUser = action.payload;
            console.log(action.payload)
        }
    }
})

export default toolkitSlice.reducer
export const {setUserIp, setNewUserIp, setClientIP, setValueDoc, setValueMsg, setCurrentMessage, setSearchUser} = toolkitSlice.actions