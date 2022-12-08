const authModel = require("../Model/Auth")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const cloudinary = require("../utils/cloudinary")
const fs = require("fs")
require("dotenv").config()


const registerUser = async(req, res)=>{
    try {
        const {fullname, phone, email, password,  isAdmin, imageId, imageUrl} = req.body
//encrypt password
        const salted  = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salted)

        //create a user
// cloudy = await cloudinary.uploader.upload(req.file.path)

if (!(email && password && fullname && phone)) {
    res.status(400).json({message:"All input is required"});
  }else{
    const oldUser = await authModel.findOne({ email });

    if (oldUser) {
      return res.status(409).json({message:"User Already Exist. Please Login"
      });
    }else{
        const user = await authModel.create({
            fullname, phone, email, password:hashed, isAdmin:false, 
            // image:req.file.path
        }) 

        res.status(201).json({
            message:"user created",
            data:user
        })
    }
  }
      
    } catch (error) {
        console.log(error) 
    }
}

const registerAdmin = async(req, res)=>{
    try {
        const {fullname, phone, email, password, isAdmin, imageId, imageUrl} = req.body
//encrypt password
        const salted  = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salted)

        //create a user
// cloudy = await cloudinary.uploader.upload(req.file.path)

if (!(email && password && fullname && phone)) {
    res.status(400).json({message:"All input is required"});
  }else{
    const oldUser = await authModel.findOne({ email });

    if (oldUser) {
      return res.status(409).json({message:"User Already Exist. Please Login"
      });
    }else{
        const user = await authModel.create({
            fullname, phone, email, password:hashed, isAdmin:true, 
            // image:req.file.path
        }) 

        res.status(201).json({
            message:"user created",
            data:user
        })
    }
  }
      
    } catch (error) {
        console.log(error) 
    }
}

const editUser= async(req, res)=>{
    try {
        const {fullname, phone, location, email}=  req.body
        const userId = req.params.userId
        const user = await authModel.findByIdAndUpdate(userId, {
            fullname, phone, email, location
        }, {new:true})

        res.status(201).json({
            message:"user edited",
            data:user
        })
    } catch (error) {
        console.log(error)
    }
}
const editAvatar = async(req, res)=>{
    try {
        const userId = req.params.userId
const {imageId, imageUrl }= req.body
const oneUser = await authModel.findById(userId)

if(!oneUser.imageId){
    const cloudy = await cloudinary.uploader.upload(req.file.path)

    const user= await authModel.findByIdAndUpdate(userId, {
        image:req.file.path, imageId:cloudy.public_id, 
        imageUrl:cloudy.secure_url
    }, {
        new:true
    })
    res.status(201).json({
        message:"avatar edited",
        data:user
    })
}else{
    // const oneUser = await authModel.findById(userId)
    await fs.unlinkSync(oneUser.image)
    await cloudinary.uploader.destroy(oneUser.imageId)
    const cloudy = await cloudinary.uploader.upload(req.file.path)

    const user= await authModel.findByIdAndUpdate(userId, {
        image:req.file.path, imageId:(await cloudy).public_id, 
        imageUrl:(await cloudy).secure_url
    }, {
        new:true
    })
    res.status(201).json({
        message:"avatar changed", 
        data:user
    })
}
      
    } catch (error) {
        console.log(error)
    }
}
const getUsers = async(req, res)=>{
    try {
        const users = await authModel.find()
        res.status(200).json({
            message:"all users",
            count:users.length,
            data:users
        })
    } catch (error) {
        console.log(error)
    }
}
const getUser = async(req, res)=>{
    try {
        const userId = req.params.userId
        const user = await authModel.findById(userId)
        res.status(200).json({
            message:"single user",
            // count:users.length,
            data:user
        })
    } catch (error) {
        console.log(error)
    }
}

const signin  = async(req, res)=>{
    try {
        const {email, password}= req.body
        const user = await authModel.findOne({email})

        if(user){
            const checks = await bcrypt.compare(password, user.password) 
            if(checks){
                const token =  jwt.sign(
                
                    {
                        _id:user._id,
                        email:user.email, 
                        location:user.location, 
                        fullname:user.fullname,
                        phone:user.phone,
                        image:user.image,
                        imageUrl:user.imageUrl,
                        isAdmin:user.isAdmin,
                        imageId:user.imageId 


                }, process.env.SECRETPASS, {expiresIn:"28d"})
            const {password, ...info} = user._doc
res.status(200).json({
    message:"succesfully signedin",
    data:{token, ...info}
})
            }

        }else{
            res.status(400).json({
                message:"not a user, please sign up3"
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const removeUser = async(req, res)=>{
    try {
        const userId = req.params.userId
        const user = await authModel.findByIdAndDelete(userId)
await fs.unlinkSync(user.image)
await cloudinary.uploader.destroy(user.imageId)

    } catch (error) {
        console.log(error)
    }
}
module.exports={
    registerUser,
    registerAdmin, editUser, editAvatar, getUsers, 
    getUser, 
    signin, 
    removeUser
}