const express = require("express")
const router  = express.Router()
const {
    createProduct,
    viewProduct,
    viewOneProduct, 
    removeOneProduct, 
    editOneProduct
}  = require("../controller/productController")
const {productUpload} = require("../utils/multer")
const validate = require("../utils/validate")

router.route("/createProduct/:userId").post(validate, productUpload,createProduct)
router.route("/removeProduct/:userId/:productId").delete(validate, removeOneProduct)
router.route("/editProduct/:userId/:productId").patch(validate, productUpload, editOneProduct)
router.route("/products/:userId").get(validate, viewProduct)
router.route("/oneProduct/:userId/:productId").get(validate, viewOneProduct)
module.exports  = router  