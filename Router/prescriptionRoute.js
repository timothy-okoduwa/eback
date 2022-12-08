const express = require("express")
const router  = express.Router()
const {
    createPrescription,
    getPrescription,
    getOnePrescription,
   removeOnePrescription,
   createLink,
   getLink, 
   getOneLink, 
   removeOneLink
}  = require("../controller/prescriptionController")  
const {pictureUpload} = require("../utils/multer")
const validate = require("../utils/validate")

router.route("/createPrescription/:userId").post(validate, pictureUpload, createPrescription)
router.route("/getPrescription/:userId").get(validate, getPrescription)
router.route("/getOnePrescription/:userId/:prescriptionId").get(validate,  getOnePrescription)
router.route("/deletePrescription/:userId/:prescriptionId").delete(validate,   removeOnePrescription)

//Link

router.route("/createLink/:userId").post(validate, createLink)
router.route("/getLink/:userId").get(validate, getLink)
router.route("/getOneLine/:userId/:prescriptionId").get(validate,  getOneLink)
router.route("/deleteLink/:userId/:prescriptionId").delete(validate,    removeOneLink)

module.exports  = router  