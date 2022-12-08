const express = require("express")
const router  = express.Router()
const {
    createConversation,
    getConversation 
   
}  = require("../controller/chatController")
// const {productUpload} = require("../utils/multer")
const validate = require("../utils/validate")

router.route("/createConversation/:userId").post(validate, createConversation)
// router.route("/removeAddress/:userId/:productId").delete(validate, removeAddress)

router.route("/conversation/:userId/:conversationId").get(validate, getConversation)
// router.route("/singleAddress/:userId/:productId").get(validate, getOneAddress)
module.exports  = router  