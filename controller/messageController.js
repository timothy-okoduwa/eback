const authModel = require("../Model/Auth")
const msgModel = require("../Model/message")
const chatModel = require("../Model/chats")
const cloudinary  = require("../utils/cloudinary")
const mongoose = require("mongoose")



const createMessageAndImage  = async(req, res) =>{
    try {
        

        const {msg, msgImgId, msgImgUrl} = req.body
        
        const userId = req.params.userId

        const user = await authModel.findById(userId)
        const conversationId = req.params.conversationId


        const conversation = await chatModel.findById(conversationId)
 const cloudy = await cloudinary.uploader.upload(req.file.path)
        if(user){
            const newMessage = new msgModel({
                msg, msgImgId:cloudy.public_id, msgImgUrl:cloudy.secure_url, msgImg:req.file.path
            })
 
            newMessage.conversation = conversation
            newMessage.save()
            conversation.messages.push(newMessage) 
            conversation.save()

            res.status(201).json({
                message:"message created",
                data:newMessage
            })
        }else{
            res.status.json(400).json({
                message:"not a user"
            })
        }
    } catch (error) {
        console.log(error)
    }
}
const createMessage = async(req, res) =>{
    try {
        

        const {msg} = req.body
        
        const userId = req.params.userId

        const user = await authModel.findById(userId)
        const conversationId = req.params.conversationId


        const conversation = await chatModel.findById(conversationId)

        if(user){
            const newMessage = new msgModel({
                msg
            })
 
            newMessage.conversation = conversation
            newMessage.save()
            conversation.messages.push(newMessage) 
            conversation.save()

            res.status(201).json({
                message:"message created",
                data:newMessage
            })
        }else{
            res.status.json(400).json({
                message:"not a user"
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const getMessages = async(req, res) =>{
    try {
        

        const userId  = req.params.userId
        const messageId  = req.params.messageId

        const user   = await authModel.findById(userId)

        if(user){
            const messages  = await msgModel.findById(messageId)
res.status(200).json({
    message:"single message",
    data:messages
})

        }else{
            res.status(404).json({
                message:"not a user, unauthorized action"
            })
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports  =  {
    createMessageAndImage,
    getMessages,
    createMessage
}