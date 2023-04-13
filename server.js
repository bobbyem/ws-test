/* --------------------------------- Imports -------------------------------- */
const ws = require("ws");
const dotenv = require("dotenv").config();
const express = require("express");

/* -------------------------------- Variables ------------------------------- */
const { WebSocketServer } = ws;
const CONFIG = {
  EXPRESS_PORT: process.env.EXPRESS_PORT || 3000,
  WSS_PORT: process.env.WSS_PORT || 5000,
};
const { v4: uuid } = require("uuid");
const server = new WebSocketServer({ port: CONFIG.WSS_PORT });
const app = express();

/* ------------------------------- Middleware ------------------------------- */
app.use(express.static("public"));

/* -------------------------------- Listeners ------------------------------- */
server.on("connection", (socket) => {
  socket.id = uuid();
  socket.on("message", (data) => {
    const message = `${socket.id}: ${data.toString()}`;
    server.clients.forEach((client) => {
      client.send(message);
    });
  });
});

app.listen(CONFIG.EXPRESS_PORT, () =>
  console.log("Server running on port: ", CONFIG.EXPRESS_PORT)
);
