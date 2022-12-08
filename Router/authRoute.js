const express = require("express")
const router = express.Router()
const {registerUser, registerAdmin, editUser, editAvatar, getUsers, removeUser,getUser, signin} = require("../controller/authController")
const {images} = require("../utils/multer")
const validate = require("../utils/validate")


router.route("/registerUsers").post(registerUser)
router.route("/registerAdmin").post(registerAdmin)
router.route("/editUser/:userId").patch(validate,editUser)
router.route("/editUser/:userId").patch(validate, editUser)
router.route("/removeUser/:userId").get(validate, removeUser)
router.route("/editAvatar/:userId").patch(validate, images, editAvatar)
router.route("/allusers").get(getUsers)
router.route("/oneUser/:userId").get(getUser)
router.route("/siginin").post(signin)

module.exports= router 