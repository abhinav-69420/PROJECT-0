const express = require('express')
const productRouter = express.Router()
const Auth =require("../middleware/userAuth")
const {createProduct, 
    getProducts, 
    getProductForApproval,
    getProductsforseller,
    approveProduct} = require('../controller/productCrontroller')
const upload = require('../middleware/uploadImage')


productRouter.post('/addproduct',Auth,upload.array("images",2),createProduct)
productRouter.get('/getproduct',getProducts)
productRouter.get('/getproductapproval',getProductForApproval)
productRouter.get('/getproductforseller',Auth,getProductsforseller)
productRouter.post('/approveproduct',Auth,approveProduct)



module.exports=productRouter;
