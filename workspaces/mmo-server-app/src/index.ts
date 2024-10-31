import { WebSocketServer, WebSocket } from 'ws';
import { D3Data } from 'mmo-common-lib';

const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected');
  ws.on('message', (message: string) => {
    console.log(`Received message => ${message}`);
    ws.send(`Received message => ${message}`);
  });
  ws.on('close', () => {
    console.log('Client disconnected');
  });
  ws.on('error', (err) => {
    console.log('Error => ', err);
  });
  ws.send('Hello! Message From Server!!');
});

wss.on('listening', () => {
    console.log('Server started on port 8080');
});

wss.on('close', () => {
    console.log('Server closed');
});

wss.on('error', (err) => {
    console.log('Error => ', err);
});