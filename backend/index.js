const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const userRouter=require('./routes/userRouter')
const productRouter = require('./routes/productRouter')

app.use(cors())
const connectDB = async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}
connectDB();
app.use(express.json())
app.use('/',userRouter)
app.use('/product',productRouter)





app.listen(process.env.PORT,()=>{
    console.log(`server is running on port`)
})
