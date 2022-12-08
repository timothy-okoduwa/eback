const mongoose = require("mongoose")

const messageSchema = mongoose.Schema({
    msg:{
        type:String
    },
    msgImgId:{
        type:String
    },
    msgImg:{
        type:String
    },
    msgImgUrl:{
        type:String
    },
 
    
   conversation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"chats"
    },
}, {timestamps:true})

module.exports= mongoose.model("msg", messageSchema)