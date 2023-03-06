import {createSlice} from "@reduxjs/toolkit";

const toolkitSlice = createSlice({
    name: "toolkit",
    initialState: {
        userIp: [],
        valueDoc: '',
        valuesMsg: [],
        currentMessage: '',
    },
    reducers: {
        setUserIp(state, action){
            state.userIp.push(action.payload);

        },
        setValueDoc(state, action){
            state.valueDoc = action.payload
        },
        setValueMsg(state, action) {
            state.valuesMsg.push(action.payload);
        },
        setCurrentMessage(state, action) {
            state.currentMessage= action.payload;
        }
    }
})

export default toolkitSlice.reducer
export const {setUserIp, setValueDoc, setValueMsg, setCurrentMessage} = toolkitSlice.actions