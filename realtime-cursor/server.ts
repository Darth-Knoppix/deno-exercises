import {
  WebSocketClient,
  WebSocketServer,
} from "https://deno.land/x/websocket@v0.1.2/mod.ts";

interface UpdateMessage {
  t: "update";
  p: User;
}

interface RemoveMessage {
  t: "remove";
  p: string;
}

type Payload = UpdateMessage | RemoveMessage;

interface Position {
  x: number;
  y: number;
}

interface User {
  id: string;
  position: Position;
}

let users: Record<string, Position> = {};

const wss = new WebSocketServer(8080);
wss.on("connection", function (ws: WebSocketClient) {
  ws.on("message", function (message: string) {
    const payload: Payload = JSON.parse(message);

    switch (payload.t) {
      case "remove":
        delete users[payload.p];
        break;
      case "update":
        users[payload.p.id] = payload.p.position;
        break;
    }

    ws.send(JSON.stringify(users));
  });
});
