const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const sellerRouter = require('./routes/sellerRouter')
const buyerRouter=require('./routes/buyerRouter')
const productRouter = require('./routes/productRouter')
const cartRouter = require('./routes/cartRouter')
const orderRouter = require('./routes/orderRouter')

const path = require('path');
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use(cors());
const connectDB = async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}
connectDB();
app.use(express.json())
app.use('/buyer',buyerRouter)
app.use('/seller',sellerRouter)
app.use('/product',productRouter)
app.use('/cart',cartRouter)
app.use('/order',orderRouter)





app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})
