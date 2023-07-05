const express=require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv").config()
const userRouter=require("./routes/userRouter")


const PORT=8080
const app=express()
app.use (express.json())
app.use(userRouter)
const url =process.env.DB
mongoose.connect(url).then(()=>{
    console.log("connected to database successfully");
}).then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is listening to port ${PORT}`)
    })
})



