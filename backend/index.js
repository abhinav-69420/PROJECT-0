const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const userRouter=require('./routes/userRouter')
const productRouter = require('./routes/productRouter')
const cartRouter = require('./routes/cartRouter')
const path = require('path');
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use(cors());
const connectDB = async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}
connectDB();
app.use(express.json())
app.use('/',userRouter)
app.use('/product',productRouter)
app.use('/cart',cartRouter)





app.listen(process.env.PORT,()=>{
    console.log(`server is running on port`)
})
