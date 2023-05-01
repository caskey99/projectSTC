import {createSlice} from "@reduxjs/toolkit";

const toolkitSlice = createSlice({
    name: "toolkit",
    initialState: {
        userIp: '',
        newUserIp: '',
        clientIP: '',
        valueDoc: '',
        valuesMsg: [
            "{\"method\":\"sendMessage\",\"ipRecipient\":\"192.168.31.14\",\"ipSender\":\"192.168.0.1\",\"ipCurr\":\"192.168.31.14\",\"id\":0,\"nameSender\":\"Артем\",\"message\":\"Донесение на РБ 100С\",\"date\":\"2023-04-30T11:04:18.227Z\",\"timestamp\":\"14:4\"}",
            "{\"method\":\"sendMessage\",\"ipRecipient\":\"192.168.31.14\",\"ipSender\":\"192.168.0.1\",\"ipCurr\":\"192.168.31.14\",\"id\":0,\"nameSender\":\"Артем\",\"message\":\"Донесение на РБ 233С\",\"date\":\"2023-04-29T11:04:18.227Z\",\"timestamp\":\"14:4\"}",
            "{\"method\":\"sendMessage\",\"ipRecipient\":\"192.168.31.14\",\"ipSender\":\"192.168.0.1\",\"ipCurr\":\"192.168.31.14\",\"id\":0,\"nameSender\":\"Артем\",\"message\":\"Донесение на РБ 145С\",\"date\":\"2023-04-28T11:04:18.227Z\",\"timestamp\":\"14:4\"}",
            // "{\"method\":\"sendMessage\",\"ipRecipient\":\"192.168.31.14\",\"ipSender\":\"192.168.0.1\",\"ipCurr\":\"192.168.31.14\",\"id\":0,\"nameSender\":\"Артем\",\"message\":\"Донесение на РБ 157С\",\"date\":\"2023-03-30T11:04:18.227Z\",\"timestamp\":\"14:4\"}",
            "{\"method\":\"sendMessage\",\"ipRecipient\":\"192.168.31.14\",\"ipSender\":\"192.168.0.1\",\"ipCurr\":\"192.168.31.14\",\"id\":0,\"nameSender\":\"Артем\",\"message\":\"Донесение на РБ 101С\",\"date\":\"2023-01-30T11:04:18.227Z\",\"timestamp\":\"14:4\"}"
        ],
        currentMessage: '',
        // searchVal: {query1:''},
        searchUser: {query:''},
        document: '',
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
            state.valueDoc = action.payload;
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
        },
        setDocument(state, action) {
            console.log("toolkitSlice" + action.payload);
            state.document = action.payload;
        },
    }
})

export default toolkitSlice.reducer
export const {setUserIp, setNewUserIp, setClientIP, setValueDoc, setValueMsg, setCurrentMessage, setSearchUser, setDocument} = toolkitSlice.actions