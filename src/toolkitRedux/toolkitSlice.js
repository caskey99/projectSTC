import {createSlice} from "@reduxjs/toolkit";

const toolkitSlice = createSlice({
    name: "toolkit",
    initialState: {
        userIp: [],
        newUserIp: '',
        valueDoc: '',
        valuesMsg: [],
        currentMessage: '',
        searchVal: {query:''},
    },
    reducers: {
        setUserIp(state, action){
            state.userIp.push(action.payload);
        },
        setNewUserIp(state, action){
            state.newUserIp = action.payload;
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
        setSearchVal(state, action){
            state.searchVal = action.payload;
        }
    }
})

export default toolkitSlice.reducer
export const {setUserIp, setNewUserIp, setValueDoc, setValueMsg, setCurrentMessage, setSearchVal} = toolkitSlice.actions