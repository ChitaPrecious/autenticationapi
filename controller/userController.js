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
        email,
        password:hashedPawsword

        }
        const New=await userModel.create(data)
        const token=jwt.sign(
            {
                id:New._id,
                password:New.password




            },process.env.secretKey,{expiresIn:"1d"}
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
            password: checkUser.password
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