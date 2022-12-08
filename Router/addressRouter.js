const express = require("express")
const router  = express.Router()
const {
    createAddress, 
    getAddress,
    getOneAddress,
    removeAddress
}  = require("../controller/addressController")
// const {productUpload} = require("../utils/multer")
const validate = require("../utils/validate")

router.route("/createAddress/:userId").post(validate,createAddress)
router.route("/removeAddress/:userId/:productId").delete(validate, removeAddress)

router.route("/address/:userId").get(validate, getAddress)
router.route("/singleAddress/:userId/:productId").get(validate, getOneAddress)
module.exports  = router    