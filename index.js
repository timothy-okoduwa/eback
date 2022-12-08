const express = require("express")
require("dotenv").config()
const port = process.env.PORT || 1111
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")
const app = express() 
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    app.listen(port,()=>{
        console.log(`listening to ${port} server and database`)
    })
}).catch((err)=>{
    console.log(err)
})
app.use(express.json())
const corsOptions = {
    origin : "*",
    credentials:true,
   optionSuccessStatus:200 
} 
app.use(cors(corsOptions)) 
app.use(morgan("dev"))
app.use("/api/ekose/v1", require("./Router/authRoute"))
app.use("/api/ekose/v1", require("./Router/addressRouter"))
app.use("/api/ekose/v1", require("./Router/productRoute"))
app.use("/api/ekose/v1", require("./Router/prescriptionRoute"))
app.use("/api/ekose/v1", require("./Router/chatRouter"))
app.use("/api/ekose/v1", require("./Router/messageRouter"))
app.get("/", (req, res)=>{
    res.status(200).json({
        message:"EkoseRx ready"
    })
})


 