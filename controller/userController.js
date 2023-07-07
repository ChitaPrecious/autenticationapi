const userModel= require('../model/userModel')
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")



//to create
exports.create=async(req,res)=>{
    try {
        const {username,email,password}=req.body
        const salt=bcrypt.genSaltSync(10)
        const hashedPawsword=bcrypt.hashSync(password,salt)
        const data={username,
        email: email.toLowerCase(),
        password:hashedPawsword

        }
        const New=await userModel.create(data)
        const token=jwt.sign(
            {
                id:New._id,
                password:New.password,
                isAdmin: New.isAdmin




            },process.env.secretKey,{expiresIn:"7 days"}
        )
        New.token=token
        New.save()
        res.status(201).json({
            message:"user created successfully",
            data:New
        })
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
        
    }
}
//to log in
  exports.userLogin=async(req,res)=>{
    try {
        const {username, password, email} = req.body
        const checkUser = await userModel.findOne({ $or: [{ username }, { email }] })
        if(!checkUser) {
            return res.status(404).json({
                Failed: 'Username/Email not found or incorrect'
            })
        }
        const checkPassword = bcrypt.compareSync(password,checkUser.password)
        // console.log(checkPassword);
        if (!checkPassword) {
            return res.status(404).json({
                Message: 'Login Unsuccessful',
                Failed: 'Invalid password'
            })
        }
        const token = jwt.sign({
            id: checkUser._id,
            password: checkUser.password,
            isAdmin: checkUser.isAdmin
        },
        process.env.secretKey, {expiresIn: "30 mins"})

        checkUser.token = token

        checkUser.save()

        res.status(200).json({
            Success: 'Login successful',
            data: [checkUser._id, checkUser.username, checkUser.token]
        })

        
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
        
    }
}
//to get all
exports.getAll=async(req,res)=>{
    try {
        const All=await userModel.find()
        res.status(200).json({
            message:`the total no of users are : ${All.length}  `,
            data:All
        })
        
    } catch (error) {

        res.status(500).json({
            status:"failed",
            error:error.message
        })
        
    }
}
exports.getOne=async(req,res)=>{
    try {
        const userId=req.params.userId
        const One=await userModel.findById(userId)
        if (!One) {
            res.status(200).json({
                message:" this user you want to getuser not found"
            })

            
        }
        res.status(200).json({
            message:`this is the user with this id :${userId} has been gotten by the admin`,
            data:One
        })
        
    } catch (error) {
        res.status(500).json({
            staus:"failed",
            error:error.message
        })
        
    }
}
exports.update=async(req,res)=>{
    try {
        const userId=req.params.userId
        const updated=await userModel.findByIdAndUpdate(userId,req.body,{new:true})
        if (!updated) {
            res.status(200).json({
                message:"this user you want to update does not exist"
            })
            
        } 
        res.status(200).json({
            message:`the user with this id :${userId} has been updated by the admin`,
            data:updated
        })
        
    } catch (error) {
        res.status(500).json({
            status:"failed",
            error:error.message
        })
        
    }
}
exports.deleteUser=async(req,res)=>{
    try {
        const userId=req.params.userId
        const user = await userModel.findById(userId)
        if(!user){
             res.status(200).json({
                message:" this user you want to delete was not found"
            })
        }
        const deleted=await userModel.findByIdAndDelete(userId)
        res.status(200).json({
            message:`the user with this id :${userId} has been deleted by the admin`,
            data:deleted
        })
        
    } catch (error) {
        res.status(500).json({
            status:"failed",
            error:error.message
        })
        
    }
}