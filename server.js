const {client, connection} = require("websocket");
const {WebSocketServer} = require("ws");
const req = require("websocket/lib/WebSocketClient");

const clients = {};
const messages = [];
var counter = 0;

const server = new WebSocketServer({ port: 9399 })

server.on('connection', function connection(ws, req) {
    clients[req.headers.origin] = ws
    console.log('connected');
    ws.on('message', msg => {
        msg = JSON.parse(msg);
        switch (msg.method) {
            case "sendMessage":
                sendMsgToIp(ws, req, msg);
                break
            case "getMessage":
                getMsgToIp(ws, req);
                break
            default :
                break
        }
    })
})


const sendMsgToIp = (ws, req, msg) => {
    const ip = req.socket.remoteAddress.replace(/^.*:/, '');
    const wss = clients[`http://${ip}:8080`];
    msg.id = counter;
    wss?.send(JSON.stringify(msg));
    messages[counter] = msg;
    counter++;
}

const getMsgToIp = (ws, req) => {
    if(messages.length) {
        const ip = req.socket.remoteAddress.replace(/^.*:/, '')
        const msgToIp = messages.filter(msg => (msg.ipRecipient === ip || msg.ipSender === ip))
        const wss = clients[`http://${ip}:8080`];
        msgToIp.map(msg => wss?.send(JSON.stringify(msg)));
    }
}