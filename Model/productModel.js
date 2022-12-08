const mongoose = require("mongoose")



const productSchema = mongoose.Schema({
    drugsName:{
        type:String
    },
  
    measurement:{
        type:String
    },
    price:{
        type:String 
    },
    description:{
        type:String
    },
   
    drugImage:{
        type:String
    },
    drugImageId:{
        type:String
    },
    drugImageUrl:{
        type:String
    }
}, {timestamps:true})

module.exports = mongoose.model("Products", productSchema)
