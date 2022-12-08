const mongoose = require("mongoose")

const adminSchema = mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
  town:{
        type:String,

        required:true
    },
    street:{
        type:String,
        required:true

    },
    zip:{
        type:String,
        required:true
    },
    note:{
        type:String
    },
    userName:{
        type:String,
        required:true
    },
    userEmail:{
        type:String,
        required:true
    },
    orderTotal:{
        type:Number,
        required:true
    },
    orderQty:{
        type:String,
        required:true
    },
    orderItem:{
        type:String,
        required:true
    },
    userPhone:{
        type:String,
        required:true
    }
    
   
}, {timestamps:true})

module.exports= mongoose.model("address", adminSchema)