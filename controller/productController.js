const productModel  = require("../Model/productModel")
const cloudinary = require("../utils/cloudinary")
const authModel = require("../Model/Auth")
const fs   = require("fs")


const createProduct = async(req, res)=>{
    try {
        const {drugsName,  measurement, price, description,drugImageId, drugImageUrl} = req.body
        const userId = req.params.userId
        const user = await authModel.findById(userId)
        const cloud = cloudinary.uploader.upload(req.file.path)

        if(user.isAdmin  === true){
const product  = await productModel.create({
    drugsName, measurement, price, description, drugImage:req.file.path, drugImageId:(await cloud).public_id, drugImageUrl:(await cloud).secure_url
})

res.status(201).json({
    message:"product created", 
    data:product
})
        }else{
res.status(404).json({
    message:"not an admin"
})
        }
    } catch (error) {
        console.log(error)
    }
}  
const viewProduct = async(req, res) =>{
    try {
        const userId = req.params.userId

        const user = await authModel.findById(userId)

        if(user){
            const products = await productModel.find().sort({ createdAt: -1 })
       
            res.status(200).json({
             message:"all products",
         no_of_products:products.length > 0 ? products.length :"no products",
     
             data:products
            })
        }else{
            res.status(404).json({
                message:"not a user"
            
        
              
               })
        }
     
    } catch (error) {
        console.log(error)
    }
}
const viewOneProduct = async(req, res) =>{
    try {
        const productId  =  req.params.productId
        const userId  =  req.params.userId
        const user = await authModel.findById(userId)

       if(user){

       const products = await productModel.findById(productId)

        res.status(200).json({
            message:"dingle product",
            data:products
           })
       }else{

       }
       
   
    } catch (error) {
        console.log(error)
    }
}
const editOneProduct = async(req, res) =>{
    try {
        const {drugsName, size, measurement, price, description,drugImageId, drugImageUrl} = req.body
        const productId  =  req.params.productId

        const userId = req.params.userId
        const user = await authModel.findById(userId)
        if(user.isAdmin === true){
            const products = await productModel.findById(productId)
            // console.log(products)
            // console.log(products.drugImageId)
            await cloudinary.uploader.destroy(products.drugImageId)
            await fs.unlinkSync(products.drugImage)
            // 6340d999cd5da4e19e292944 
          const cloud  = await cloudinary.uploader.upload(req.file.path) 
            // await productModel.findByIdAndDelete(productId)
const data = {
    drugsName,  measurement, price, description, drugImage:req.file.path, drugImageId:(await cloud).public_id, drugImageUrl:(await cloud).secure_url
}
            const newProduct = await productModel.findByIdAndUpdate(productId,data, {new:true})
            res.status(200).json({ 
             message:" product edited", 
             data:newProduct
            
            }) 
        }else{ 
            res.status(404).json({
                message:"not an admin" 
            })
        }

      
    } catch (error) {
        console.log(error)
    }
}
const removeOneProduct = async(req, res) =>{
    try {
        const productId  =  req.params.productId
        const userId = req.params.userId
        const user = await authModel.findById(userId)
        if(user.isAdmin === true){
            const products = await productModel.findById(productId)
            console.log(products.drugImageId)
            await cloudinary.uploader.destroy(products.drugImageId)
            await fs.unlinkSync(products.drugImage)
            await productModel.findByIdAndDelete(productId)
            res.status(204).json({
             message:" product deleted"
            
            }) 
        }else{ 
            res.status(404).json({
                message:"not an admin" 
            })
        }

      
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = {
    createProduct, 
    viewProduct, viewOneProduct,
    removeOneProduct, editOneProduct
}