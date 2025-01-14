const express = require('express')
const buyerRouter = express.Router()
const BuyerController = require('../controller/buyerControllers')
const Auth =require("../middleware/userAuth")
const { validateBuyerLogin } = require("../utils/validation");


buyerRouter.post('/signupbuyer',BuyerController.signupbuyer)
buyerRouter.post('/loginbuyer',validateBuyerLogin,BuyerController.loginBuyer)
buyerRouter.get('/getbuyer',Auth,BuyerController.getBuyer)
buyerRouter.put('/updatebuyer',Auth,BuyerController.updateBuyer)
buyerRouter.delete('/deletebuyer',Auth,BuyerController.deleteBuyer)

buyerRouter.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
  });


module.exports=buyerRouter;