const jwt=require("jsonwebtoken")
const userModel=require("../model/userModel")



const autentication=async(req,res,next)=>{
 try {
    const user=await userModel.findById(req.params.id)
    const userToken=user.token
    if(!userToken){
        res.status(400).json(
            "token not found"
        )
    }
    await jwt.verify(userToken,process.env.secretKey,(error,payLoad)=>{
        if (error) {res.json(error.message)
            
        } else {
            req.user=payLoad
            next()
            
        }
    })
    
 } catch (error) {
    res.json(error.message)
    
 }

}
exports.checkUser=async(req,res,next)=>{
        

autentication(req,res,async()=>{
const users=await userModel.findById(req.params.id)
    if (users.isnewAdmin){
        next()
        
    } else {
        res.json(
            "you are not authorized to ferform this action"
        )
    }
})
}