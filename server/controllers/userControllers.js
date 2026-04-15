import User from "../models/userModels.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary';

const generateToken = (user) => {
    return jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:"1d"})
}

export const register = async (req,res) => {
    try {
        const {name,email,password} = req.body
        if(!name || !email || !password){
            return res.status(400).json({success:false,message:"All fields are required"})
        }
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({success:false,message:"User already exists"})
        }
        let imageUrl = ""
        if(req.file){
            const image = await cloudinary.uploader.upload(req.file.path)
            imageUrl = image.secure_url
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = await User.create({
            name,
            email,
            password:hashedPassword,
            avatar:imageUrl,
            skills : req.body.skills,
            status : req.body.status
        })
        const token = generateToken(newUser)
        res.status(201).json({success:true,message:"User registered successfully",user:newUser,token})
    }catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}
export const login = async (req,res) => {
    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({success:false,message:"All fields are required"})
        }
        const user = await User.findOne({email})
        if(!user || !(await bcrypt.compare(password,user.password))){
            return res.status(400).json({success:false,message:"Invalid credentials"})
        }
         const token = generateToken(user)
         res.status(200).json({success:true,message:"Login successful",token,user})
         }catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}
export const updateProfile = async (req, res) => {  
      
    try {
        const updatedData = {}
        if (req.body.name) {
            updatedData.name = req.body.name
        }

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path)
            updatedData.avatar = result.secure_url
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updatedData },
            { new: true }
        )

        res.status(200).json({
            success: true,
            user,
            message: "Profile updated successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getAllUser = async (req,res) => {
    try{
    
       const user = await User.find().
       select('-password').sort({createAt:-1})
       if(!user){
        return res.status(400).json({success:false,message:'user not found'})
       }
       res.status(200).json({user})
    }catch(error){
       res.status(500).json({success:false,message:error.message})
    }
}

