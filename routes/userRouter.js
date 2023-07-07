
const {create,userLogin, getAll, getOne, update, deleteUser}=require("../controller/userController")
const {checkUser}=require("../controller/authorization")
const { deleteOne } = require("../model/userModel")
router=require("express").Router()
router.route("/").get((req,res)=>{
    res.json("welcome to my autentication")
})
router.route("/signup").post(create)
router.route("/login").post(userLogin)

router.route("/getall").get(getAll)
router.route("/:id/getall").get(checkUser,getAll)
router.route("/:id/:userId/getone").get(checkUser,getOne)
router.route("/renew/:id/:userId").put(checkUser,update)
router.route("/remove/:id/:userId").delete(checkUser,deleteUser)


module.exports=router