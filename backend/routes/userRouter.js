const express = require('express')
const userRouter = express.Router()
const UserController = require('../controller/userControllers')
const Auth =require("../middleware/userAuth")


userRouter.post('/signup',UserController.signup)
userRouter.post('/login',UserController.loginUser)
userRouter.get('/getuser',Auth,UserController.getUser)
userRouter.put('/updateuser',Auth,UserController.updateUser)
userRouter.delete('/deleteuser',Auth,UserController.deleteUser)


module.exports=userRouter;