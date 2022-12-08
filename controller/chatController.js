const authModel = require("../Model/Auth")
// const msgModel = require("../Model/message")
const chatModel = require("../Model/chats")
// const cloudinary  = require("../utils/cloudinary")
const mongoose = require("mongoose")



const createConversation  = async(req, res) =>{
    try {
        

        const {senderId, recieverId} = req.body
        
        const userId = req.params.userId

        const user = await authModel.findById(userId)
 
        if(user){
            const newconversation = new chatModel({
                senderId, recieverId 
            })
 
            newconversation.chat=user 
            newconversation.save()
            user.userChat.push(newconversation) 
            user.save()



            res.status(201).json({
                message:"conversation created",
                data:newconversation
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

const getConversation = async(req, res) =>{
    try {
        

        const userId  = req.params.userId
        const conversationId  = req.params.conversationId

        const user   = await authModel.findById(userId)

        if(user){
            const conversation  = await chatModel.findById(conversationId)
res.status(200).json({
    message:"conversation",
    data:conversation
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
    createConversation,
    getConversation
}