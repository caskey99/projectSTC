import {useDispatch, useSelector} from "react-redux";
import {setValueMsg} from "./toolkitRedux/toolkitSlice";

export class WebsocketClient {
    constructor() {
        this.dispatch = useDispatch();
        if (WebsocketClient.instance) {
            return WebsocketClient.instance;
        }
        this.client = new WebSocket("ws://192.168.31.14:9399");
        WebsocketClient.instance = this;
        return this;
    }

    getWebsocketClient() {
        return this.client;
    }

    createWebsocketClient(ip) {
        return new WebSocket(`ws://${ip}:9399`);
    }

    onOpen() {
        this.client.onopen = () => {
            console.log("privet" + this.client);
            const obj = {
                method: "getMessage",
                ipRecipient : '',
                ipSender: '',
                ipCurr: '',
                id: '',
                message: '',
                timestamp: '',
            }
            this.client.send(JSON.stringify(obj));
                    }
    }

    onMessage() {
        this.client.onmessage = (event) => {
            this.dispatch(setValueMsg(event.data));
        }
    }

    onClose() {
        this.client.onclose = () => {
            console.log("ws closed");
        }
    }

    onError() {
        this.client.onerror = (error) => {
            console.log("WebSocket Error: ", error )
        }
    }
}

