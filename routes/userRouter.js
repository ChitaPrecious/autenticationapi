
const {create,userLogin}=require("../controller/userController")
router=require("express").Router()
router.route("/").get((req,res)=>{
    res.json("welcome to my autentication")
})
router.route("/signup").post(create)
router.route("/login").post(userLogin)


module.exports=router