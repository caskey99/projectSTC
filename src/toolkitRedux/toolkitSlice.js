import {createSlice} from "@reduxjs/toolkit";

const toolkitSlice = createSlice({
    name: "toolkit",
    initialState: {
        userIp: '',
        newUserIp: '',
        clientIP: '',
        valueDoc: '',
        valuesMsg: [
            //"{\"method\":\"sendMessage\",\"ipRecipient\":\"192.168.31.14\",\"ipSender\":\"192.168.31.14\",\"ipCurr\":\"192.168.31.14\",\"id\":0,\"nameSender\":\"Зайцев Артем\",\"message\":\"\",\"body\":\"{\\\"blank\\\":{\\\"signature\\\":{\\\"name\\\":\\\"asd\\\",\\\"post\\\":\\\"asd\\\"},\\\"time\\\":\\\"12:31:23\\\"},\\\"name\\\":\\\"Приказ о перевозке №9\\\",\\\"type\\\":\\\"text\\\",\\\"ui\\\":\\\"<!DOCTYPE html>\\\\n<html lang='ru'>\\\\n<head><meta charset='UTF-8'></head>\\\\n<body>\\\\n<div class='current-document-title'><h3>Приказ о перевозке №9</h3></div>\\\\n<div class='current-document-container'>\\\\n<div class='current-document-container-identity'><span>идентификатор распоряжения</span>  <input type=\\\\\\\"text\\\\\\\" id=\\\\\\\"name\\\\\\\" placeholder=\\\\\\\"Placeholder\\\\\\\"></input> <br> <div className=\\\\\\\"current-document-container-nameObject\\\\\\\"> <span>Наименование объекта</span> <input type=\\\\\\\"text\\\\\\\" id=\\\\\\\"post\\\\\\\" placeholder=\\\\\\\"Placeholder\\\\\\\"/> </div> </div> <div className=\\\\\\\"current-document-container-timer\\\\\\\"> <span className=\\\\\\\"timer-subtitle\\\\\\\">Длительность</span>  <input type=\\\\\\\"time\\\\\\\" id=\\\\\\\"time\\\\\\\" step=\\\\\\\"2\\\\\\\" /> </div>  \\\\n</div>\\\\n</body>\\\\n</html>\\\\n\\\"}\",\"date\":\"2023-05-08T11:34:42.189Z\",\"timestamp\":\"14:34\"}",
            //"{\"method\":\"sendMessage\",\"ipRecipient\":\"192.168.31.14\",\"ipSender\":\"192.168.31.14\",\"ipCurr\":\"192.168.31.14\",\"id\":0,\"nameSender\":\"Зайцев Артем\",\"message\":\"\",\"body\":\"{\\\"blank\\\":{\\\"signature\\\":{\\\"name\\\":\\\"asd\\\",\\\"post\\\":\\\"asd\\\"},\\\"time\\\":\\\"12:31:23\\\"},\\\"name\\\":\\\"Донесение на РБ-108С\\\",\\\"type\\\":\\\"text\\\",\\\"ui\\\":\\\"<!DOCTYPE html>\\\\n<html lang='ru'>\\\\n<head><meta charset='UTF-8'></head>\\\\n<body>\\\\n<div class='current-document-title'><h3>Приказ о перевозке №9</h3></div>\\\\n<div class='current-document-container'>\\\\n<div class='current-document-container-identity'><span>идентификатор распоряжения</span>  <input type=\\\\\\\"text\\\\\\\" id=\\\\\\\"name\\\\\\\" placeholder=\\\\\\\"Placeholder\\\\\\\"></input> <br> <div className=\\\\\\\"current-document-container-nameObject\\\\\\\"> <span>Наименование объекта</span> <input type=\\\\\\\"text\\\\\\\" id=\\\\\\\"post\\\\\\\" placeholder=\\\\\\\"Placeholder\\\\\\\"/> </div> </div> <div className=\\\\\\\"current-document-container-timer\\\\\\\"> <span className=\\\\\\\"timer-subtitle\\\\\\\">Длительность</span>  <input type=\\\\\\\"time\\\\\\\" id=\\\\\\\"time\\\\\\\" step=\\\\\\\"2\\\\\\\" /> </div>  \\\\n</div>\\\\n</body>\\\\n</html>\\\\n\\\"}\",\"date\":\"2023-05-08T11:34:42.189Z\",\"timestamp\":\"14:34\"}"
          ],
        currentMessage: '',
        searchUser: {query:''},
        documentBody: ''
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
            // console.log(action.payload);
            state.valuesMsg.push(action.payload);
        },
        setCurrentMessage(state, action) {
            state.currentMessage = action.payload;
        },

        setSearchUser(state, action){
            state.searchUser = action.payload;
        },
        setDocumentBody(state, action) {
            // console.log(action.payload);
            state.documentBody = action.payload;
        },

    }
})

export default toolkitSlice.reducer
export const {setUserIp, setClientIP, setValueDoc, setValueMsg, setCurrentMessage, setSearchUser, setDocumentBody} = toolkitSlice.actions