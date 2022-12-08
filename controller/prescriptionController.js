const prescriptionModel  = require("../Model/priscriptions")
const linkModel  = require("../Model/link")
const authModel  = require("../Model/Auth")
const cloudinary  = require("../utils/cloudinary")
const mongoose = require("mongoose")
const fs = require("fs")



const createPrescription  =  async(req, res) =>{
    try {
       const userId  =  req.params.userId
       const cloudy  =  await cloudinary.uploader.upload(req.file.path)

       const user  =  await authModel.findById(userId)
       if(user){
 const newPrescription  =  new prescriptionModel({
    picture:req.file.path, pictureId:cloudy.public_id, pictureUrl:cloudy.secure_url, userName:user.fullname
 })

 newPrescription.prescription=user
 newPrescription.save()

 user.upload.push(mongoose.Types.ObjectId(newPrescription._id))
 user.save()
 res.status(201).json({
    message:"prescription uploaded",
    data:newPrescription
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

const createLink  =  async(req, res) =>{
    try {
       const userId  =  req.params.userId
       

       const user  =  await authModel.findById(userId)
       if(user){
 const newPrescription  =  new linkModel({
   link:req.body.link,userName:user.fullname
 })

 newPrescription.linkPrescription=user
 newPrescription.save()

 user.upload.push(mongoose.Types.ObjectId(newPrescription._id))
 user.save()
 res.status(201).json({
    message:"link uploaded",
    data:newPrescription
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
const getPrescription  = async(req, res) =>{
    try {
        

        const userId  = req.params.userId

        const user   = await authModel.findById(userId)

        if(user){
            const prescription  = await prescriptionModel.find().sort({ createdAt: -1 })
res.status(200).json({
    message:"prescription",
    data:prescription
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

const getLink = async(req, res) =>{
    try {
        

        const userId  = req.params.userId

        const user   = await authModel.findById(userId)

        if(user){
            const prescription  = await linkModel.find().sort({ createdAt: -1 })
res.status(200).json({
    message:"link",
    data:prescription
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









const removeOnePrescription  = async(req, res) =>{
    try {
        

        const userId  = req.params.userId
        const prescriptionId  = req.params.prescriptionId

        const user   = await authModel.findById(userId)

        if(user){

            const prescription  = await prescriptionModel.findById(prescriptionId)
            await cloudinary.uploader.destroy(prescription. pictureId)
            await fs.unlinkSync
            await prescriptionModel.findByIdAndDelete(prescriptionId)

res.status(204).json({
    message:"single prescription deleted"

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

const getOnePrescription  = async(req, res) =>{
    try {
        

        const userId  = req.params.userId
        const prescriptionId  = req.params.prescriptionId

        const user   = await authModel.findById(userId)

        if(user){
            const prescription  = await prescriptionModel.findById(prescriptionId)
res.status(200).json({
    message:"single prescription",
    data:prescription
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

const getOneLink = async(req, res) =>{
    try {
        

        const userId  = req.params.userId
        const prescriptionId  = req.params.prescriptionId

        const user   = await authModel.findById(userId)

        if(user){
            const prescription  = await linkModel.findById(prescriptionId)
res.status(200).json({
    message:"single link",
    data:prescription
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

const removeOneLink  = async(req, res) =>{
    try {
        

        const userId  = req.params.userId
        const prescriptionId  = req.params.prescriptionId

        const user   = await authModel.findById(userId)

        if(user){

            const prescription  = await linkModel.findById(prescriptionId)
           
            await prescriptionModel.findByIdAndDelete(prescriptionId)

res.status(204).json({
    message:"single link deleted"

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

module.exports ={
    createPrescription,
    getPrescription,
    getOnePrescription,
    removeOnePrescription,
    createLink,
    getLink, 
    getOneLink, 
    removeOneLink
}