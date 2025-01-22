const express = require('express')
const productRouter = express.Router()
const Auth =require("../middleware/userAuth")
const roleMiddleware = require("../middleware/roleMiddleware");
const {createProduct, 
    getProducts, 
    getProductForApproval,
    getProductsforseller,
    approveProduct,
    upadateProductprice} = require('../controller/productCrontroller')
const upload = require('../middleware/uploadImage')


productRouter.post('/addproduct',Auth,upload.array("images",2),createProduct)
productRouter.get('/getproduct',getProducts)
productRouter.get('/getproductforseller',Auth,roleMiddleware("seller"),Auth,getProductsforseller)

//admin side routes
productRouter.get('/getproductapproval',Auth,roleMiddleware("admin"),getProductForApproval)
productRouter.post('/approveproduct',Auth,roleMiddleware("admin"),approveProduct)
productRouter.post('/updateproductprice',upadateProductprice)



module.exports=productRouter;