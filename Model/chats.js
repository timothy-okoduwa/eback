const mongoose = require("mongoose")

const chatSchema = mongoose.Schema({
    senderId:{
        type:String
    },
    recieverId:{
        type:String
    },
     
   chat:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users"
},
  messages:[{
 type:mongoose.Schema.Types.ObjectId,
    ref:"msg"
 
  }]
   
}, {timestamps:true})

module.exports= mongoose.model("chats", chatSchema)