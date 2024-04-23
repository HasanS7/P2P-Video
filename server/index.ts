import http from 'http';
import WebSocket from 'ws';

const PORT = 3001;
const web_socket_server = new WebSocket.Server({port: PORT});

let connections: WebSocket[] = [];

web_socket_server.on('connection', (ws)=> {
    connections.push(ws);
    console.log('Client connected');

    ws.on('message', (data)=> {
        const msg = data.toString('utf8');
        console.log(msg)
        for(let client of connections) {
            if(client !== ws) {
                client.send(msg);
            }
        }
    })

    ws.on('close', ()=>{
        connections = connections.filter(connection=>connection!=ws);
        console.log('Client disconnected');
    })
});

console.log(`WebSocket server started on port ${PORT}`);
// const server = http.createServer();

// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });