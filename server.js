const {client, connection} = require("websocket");
const {WebSocketServer} = require("ws");
const req = require("websocket/lib/WebSocketClient");

const server = new WebSocketServer({ port: 9399 })

const clients = {};
const messages = [];
var counter = 0;

server.on('connection', function connection(ws, req) {
    clients[req.headers.origin] = ws
    console.log('зашел')
    ws.on('message', msg => {
        msg = JSON.parse(msg)
        const ip = req.socket.remoteAddress.replace(/^.*:/, '');
        // console.log("ip"+ ip)
        msg.ipCurr = ip
        switch (msg.method) {
            case "sendMessage":
                // console.log('sendMessage')
                sendMsgToIp(ws, req, msg)
                break
            case "getMessage":
                // console.log('getMessage')
                getMsgToIp(ws, req)
                break
            default :
                break
        }
    })
})


const sendMsgToIp = (ws, req, msg) => {
    const ip = req.socket.remoteAddress.replace(/^.*:/, '');
    // msg.ipSender = ip
    msg.ipRecipient.map(
        ip => {
            const wss = clients[`http://${ip}:8080`];
            msg.id = counter;
            wss?.send(JSON.stringify(msg));
            messages[counter] = msg;
            counter++;
        }
    )
    console.log('sendMsgToIp')
    console.log('ipRecipient:' + msg.ipRecipient)
}

const getMsgToIp = (ws, req) => {
    if(messages.length) {
        messages.map(msg =>console.log(msg));
        const ip = req.socket.remoteAddress.replace(/^.*:/, '')
        const msgToIp = messages.filter(msg => msg.ipRecipient[0] === ip);
        const wss = clients[`http://${ip}:8080`];
        msgToIp.map(msg => wss?.send(JSON.stringify(msg)));
        msgToIp.map(msg => console.log(msg));
    }
    console.log("getMsgToIp")
}