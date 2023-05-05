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

    getWebsocketClientIp = (callback) => {
        this.client.addEventListener('open', (event) => {
            const ip = event.target.url.match(/\d+\.\d+\.\d+\.\d+/)[0];
            if(ip) {
                callback(ip);
            }
        });
    }

    onOpen() {
        this.client.onopen = () => {
            console.log("You are connected");
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
            console.log("Ws is closed");
        }
    }

    onError() {
        this.client.onerror = (error) => {
            console.log("WebSocket Error: ", error )
        }
    }
}

