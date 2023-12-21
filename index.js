const express = require("express");
const app = express();
const http = require("http");
require("dotenv").config();
const socketio = require("socket.io");
const server = http.createServer(app);

const io = socketio(server);
const PORT = process.env.PORT;

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on('msgSend',(data)=>{
    console.log(data);
    io.emit("msgRcvdOnServer",data);
  })
});

app.use("/", express.static(__dirname + "/Public"));

server.listen(PORT, () => {
  console.log(`server is started on ${PORT}`);
});
