const express = require("express");
const app = express();
const http = require("http");
require("dotenv").config();
const socketio = require("socket.io");
const connected=require('./config/db')
const server = http.createServer(app);
const Chat=require('./models/chat')

const io = socketio(server);
const PORT = process.env.PORT;

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join_room",async(data)=>{
    socket.join(data.roomId)
    const chats=await Chat.find({roomId:data.roomId});
    socket.emit("fetchPreviousMsg",chats)
    console.log("roomJoined")
  })

  socket.on('msgSend',(data)=>{
    console.log(data);
    io.emit("msgRcvdOnServer",data);
  })

  socket.on('msgSendOnParticularUser', async(data)=>{
    const obj={
      name:data.username,
      content:data.msg,
      roomId:data.roomId
    }
    await Chat.create(obj);
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

