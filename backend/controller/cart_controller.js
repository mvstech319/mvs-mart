const Cart = require('../models/cart_schema')
// add to cart
const addToCart = async(req,res)=>{
    const {productId,title,price,qty,imgSrc}=req.body
    const userId =req.user;
    
    let cart = await Cart.findOne({userId}); 
        if(!cart){
            cart= new Cart({userId,items:[]});
        } 
    const itemIndex=cart.items.findIndex((item)=>item.productId.toString()===productId);
    if(itemIndex > -1){
        cart.items[itemIndex].qty +=qty;
        cart.items[itemIndex].price +=price*qty;
    }
    else{
        cart.items.push({productId,title,price,qty,imgSrc});
    }
    await cart.save();
    res.status(200).json({message:'items added to cart',cart})
    
};
//get user cart

const userCart = async(req,res)=>{
    const userId =req.user;

    let cart= await Cart.findOne({userId});
    if(!cart){
        return res.status(404).json({message:'Cart not found'})
    }
    res.json({message:'user cart',cart})
};

// remove product to cart

const removeProductFromCart = async(req,res)=>{
    const productId =req.params.productId;
    const userId =req.user;

    let cart= await Cart.findOne({userId});
    if(!cart){
        return res.status(404).json({message:'Cart not found'})
    }
    cart.items=cart.items.filter((item)=>item.productId.toString()!==productId)
    await cart.save();
    res.json({message:'product remove from cart'})
};

// remove user cart
const clearCart = async(req,res)=>{
    const userId =req.user;

    let cart= await Cart.findOne({userId});
    if(!cart){
        cart = new cart({items:[]});
    }
    else{
        cart.items=[];
    }
    await cart.save();
    res.json({message:'cart cleared'})
};

// decrease qty from cart
const decreaseProductQty = async(req,res)=>{
    const {productId,qty}=req.body
    const userId =req.user;
    
    let cart = await Cart.findOne({userId}); 
        if(!cart){
            cart= new Cart({userId,items:[]});
        } 
    const itemIndex=cart.items.findIndex((item)=>item.productId.toString()===productId);
    if(itemIndex > -1){
        const item= cart.items[itemIndex]
        if(item.qty > qty){
            const pricePerUnit=item.price/item.qty
            item.qty -= qty
            item.price -= pricePerUnit
        }
        else{
            cart.items.splice(itemIndex,1)
        }
    }
    else{
        return res.json({message:'Invalid ProductId'})
    }
    await cart.save();
    res.status(200).json({message:'item qty decreased',cart})
    
};
module.exports={addToCart,userCart,removeProductFromCart,clearCart,decreaseProductQty}