const mongoose=require("mongoose")
const chatSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    content:{
        type:String,
        require:true
    },
    roomId:{
        type:String,
        require:true
    }
})

const Chat=mongoose.model("Chat",chatSchema);
module.exports=Chat;