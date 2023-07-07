const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true["username is required"]
    },
    email:{
        type:String,
        require:true["email is required"],
        unique:true
    },
    password:{
        type:String,
        require:true["password is required"]
    },
    token:{
        type:String,
       
    },
    isnewAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true})
const user=mongoose.model("userprofile",userSchema)
module.exports= user