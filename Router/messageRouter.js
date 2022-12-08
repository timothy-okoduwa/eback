const express = require("express")
const router  = express.Router()
const {
    createMessageAndImage, getMessages,createMessage
    // getConversation 
   
}  = require("../controller/messageController")
const {chatUpload} = require("../utils/multer")
const validate = require("../utils/validate")

router.route("/sendMessage/:userId/:conversationId").post(validate, chatUpload, createMessageAndImage).post(validate, createMessage)
// router.route("/removeAddress/:userId/:productId").delete(validate, removeAddress)

router.route("/messages/:userId/:messageId").get(validate, getMessages)
// router.route("/singleAddress/:userId/:productId").get(validate, getOneAddress)
module.exports  = router  