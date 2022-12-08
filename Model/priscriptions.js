const mongoose = require("mongoose")

const prescribeSchema = mongoose.Schema({
    picture:{
        type:String
    },
    pictureId:{ 
        type:String
    },
    pictureUrl:{
        type:String
    },
    userName:{
        type:String
    },
    prescription:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
}, {timestamps:true})

module.exports= mongoose.model("prescriptions", prescribeSchema)