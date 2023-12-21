var socket=io();

let btn=document.getElementById('btn');
let inputMsg=document.getElementById('newmsg');

let msgList=document.getElementById('msglist');

btn.onclick=function exec(){
    socket.emit('msgSend',{
        msg:inputMsg.value
    });
}

socket.on("msgRcvdOnServer",(data)=>{
    let limsg=document.createElement('li');
    limsg.innerText=data.msg;
    msgList.appendChild(limsg);
})