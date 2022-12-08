const mongoose = require("mongoose")

const linkSchema = mongoose.Schema({
    link:{
        type:String
    },
    userName:{
        type:String
    },
    linkPrescription:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
})
module.exports = mongoose.model("links", linkSchema)