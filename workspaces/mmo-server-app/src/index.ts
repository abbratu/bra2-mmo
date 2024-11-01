import { WebSocketServer, WebSocket } from 'ws';
import { D3Data, PlayerData, WsPlayerJoinedServerMessage, WsPlayerLeftServerMessage, WsWelcomeServerMessage } from 'mmo-common-lib';

const wss = new WebSocketServer({ port: 8080 });

const webSocketIds = new Map<WebSocket, PlayerData>();
let idCounter = 0;
wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected');
  const playerData: PlayerData = {
    id: idCounter++,
    name: `Player ${idCounter}`,
    location: {
      x: 0,
      y: 0,
      z: 0,
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
    keys: {
      up: false,
      down: false,
      left: false,
      right: false,
    },
  };
  ws.on('message', (message: string) => {
    console.log(`Received message => ${message}`);
    ws.send(`Received message => ${message}`);
  });
  ws.on('close', () => {
    console.log('Client disconnected');
    webSocketIds.delete(ws);
    const playerLeftMessage: WsPlayerLeftServerMessage = { type: 'player-left', data: playerData.id };
    const strPlayerLeftMessage = JSON.stringify(playerLeftMessage);
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(strPlayerLeftMessage);
      }
    });
  });
  ws.on('error', (err) => {
    console.log('Error => ', err);
  });

  webSocketIds.set(ws, playerData);
  // send welcome message
  ws.send(JSON.stringify({type: 'welcome',
    data: { playerId: playerData.id, players: Array.from(webSocketIds.values()), },
  } as WsWelcomeServerMessage));

  // send player joined message to all other clients
  const playerJoinedMessage: WsPlayerJoinedServerMessage = { type: 'player-joined', data: playerData };
  const strPlayerJoinedMessage = JSON.stringify(playerJoinedMessage);
  wss.clients.forEach((client) => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(strPlayerJoinedMessage));
    }
  });
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