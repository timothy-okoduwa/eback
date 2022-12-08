const authModel = require("../Model/Auth")
const addressModel = require("../Model/address")


const createAddress  = async(req, res)=>{
    try {
        const userId  = req.params.userId
        const user = await authModel.findById(userId)

        const {
            fullname,
            phone,
          town,
            street,
            zip,
            note,
            userName,
            userEmail,
            userPhone,
            orderQty,
            orderItem, 
            orderTotal
        } = req.body

        if(user){
            const addresss =await addressModel.create({
                fullname,
                phone,
              town,
                street,
                zip,
                note,
                orderQty,
                orderItem,
                orderTotal,
                userName:user.fullname,
                userEmail:user.email,
                userPhone:user.phone

            })
            res.status(201).json({
                message:"created",
                data:addresss
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

const getAddress = async(req, res)=>{
    try {
        const userId  = req.params.userId

        const user  = await authModel.findById(userId)

        if(user.isAdmin === true){
            const address  = await addressModel.find().sort({ createdAt: -1 })

            res.status(200).json({
                message:"order address", 
                data:address
            })
        }else{
            res.status(404).json({
                messsage:"unAuthorized user"
            })
        }
    } catch (error) {
        console.log(error)
    }
}
const getOneAddress = async(req, res)=>{
    try {
        const userId  = req.params.userId
        const productId  = req.params.productId

        const user  = await authModel.findById(userId)

        if(user){
            const address  = await addressModel.findById(productId)

            res.status(200).json({
                message:"order address", 
                data:address
            })
        }else{
            res.status(404).json({
                messsage:"unAuthorized user"
            })
        }
    } catch (error) {
        console.log(error)
    }
}
const removeAddress = async(req, res)=>{
    try {
        const userId  = req.params.userId
        const productId  = req.params.productId

        const user  = await authModel.findById(userId)

        if(user.isAdmin === true){
            const address  = await addressModel.findByIdAndDelete(productId)

            res.status(204).json({
                message:"order deleted", 
                
            })
        }else{
            res.status(404).json({
                messsage:"unAuthorized user"
            })
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports ={
    createAddress, 
    getAddress,
    getOneAddress,
    removeAddress
}
