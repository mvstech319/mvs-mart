const express = require('express');
const { addToCart, userCart, removeProductFromCart, clearCart, decreaseProductQty } = require('../controller/cart_controller');
const {Authenticated}=require('../middlewares/auth')
const router = express.Router();

//add to cart
router.post("/add",Authenticated,addToCart)

//get user cart
router.get('/user',Authenticated,userCart)

// remove product
router.delete('/remove/:productId',Authenticated,removeProductFromCart)

// clear cart
router.delete('/clear',Authenticated,clearCart)

// decreased item
router.post('/--qty',Authenticated,decreaseProductQty)

module.exports=router;