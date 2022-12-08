const mongoose = require("mongoose")
const uri =  "https://postimg.cc/V51S2jbC"

const userSchema = mongoose.Schema({
    fullname:{
        type:String
    },
    phone:{
        type:Number
    },
    email:{
        type:String,
        unique:true.valueOf,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        trim:true
    },
    location:{
        type:String
    },
    upload:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"prescriptions"    
    }],
    userChat:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"chats"    
    }],
    image:{
        type:String,
        default:uri
    },
    imageId:{
        type:String
    },
    imageUrl:{
        type:String
    },
    isAdmin:{
        type:Boolean
        // default:false
    }
}, {timestamps:true})

module.exports = mongoose.model("users", userSchema)