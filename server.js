const ws = require("ws");
const { WebSocketServer } = ws;
const { v4: uuid } = require("uuid");
const server = new WebSocketServer({ port: 5000 });

server.on("connection", (socket) => {
  socket.id = uuid();
  socket.on("message", (data) => {
    const message = `${socket.id}: ${data.toString()}`;
    server.clients.forEach((client) => {
      client.send(message);
    });
  });
});
