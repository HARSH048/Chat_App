const express = require("express");
const app = express();
const http = require("http");
require("dotenv").config();
const socketio = require("socket.io");
const connected=require('./config/db')
const server = http.createServer(app);

const io = socketio(server);
const PORT = process.env.PORT;

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join_room",(data)=>{
    socket.join(data.roomId)
    console.log("roomJoined")
  })

  socket.on('msgSend',(data)=>{
    console.log(data);
    io.emit("msgRcvdOnServer",data);
  })

  socket.on('msgSendOnParticularUser',(data)=>{
    io.to(data.roomId).emit("msgRcvdOnServer",data);
  })


});

app.use("/", express.static(__dirname + "/Public"));
app.set('view engine','ejs')

app.get('/chat/:roomId',(req,res)=>{
  res.render('index',{id:req.params.roomId});
})

server.listen(PORT, async () => {
  try {
    console.log(`Server is started on ${PORT}`);
    await connected();
  } catch (error) {
    console.error("Error during server startup:", error);
  }
});

