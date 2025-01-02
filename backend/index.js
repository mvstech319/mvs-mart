const express=require('express');
const ConnectDB =require('./config/db')
const dotenv=require('dotenv')
const bodyParser=require('express')
dotenv.config();
const cors=require('cors')
const UserRouter=require('./src/routes/user_router')
const ProductRouter=require('./src/routes/product_router')
const CartRouter=require('./src/routes/cart_router')
const AddressRouter=require('./src/routes/address_router')
const PaymentRouter=require('./src/routes/payment_router')

const app=express();
app.use(bodyParser.json());

app.use(cors({
    origin:true,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))


//user Router
app.use('/user',UserRouter)

//product Router
app.use('/product',ProductRouter)

// add to cart Router
app.use('/cart',CartRouter)

// address router
app.use('/address',AddressRouter)

// payment router
app.use('/payment',PaymentRouter)










ConnectDB();



const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server is running: ${PORT}`)
})
