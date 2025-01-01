const Products = require('../models/product_schema')

// add product

const addProduct =async (req,res)=> {
    const{title,description,price,category,qty,imgSrc}=req.body
    try {
        let product=await Products.create({
            title,description,price,category,qty,imgSrc
        });
        res.status(200).json({message:"Product added successfully...!",product});
    } catch (error) {
        res.status(501).json(error.message)
        
    }
    
}

//get product
const getProduct=async(req,res)=>{
    try {
        let products=await Products.find().sort({createdAt:-1})
        res.status(200).json({message:"get All Product successfully...!",products})
    } catch (error) {
        res.status(501).json(error.message)
        
    }
}


// find product by id
const getProductById=async(req,res)=>{
    const id=req.params.id;
    try {
        let product=await Products.findById(id)
        if(!product){
            return res.json({message:'invalid Id'})
        }
        res.status(200).json({message:"get specific Product successfully...!",product})
    } catch (error) {
        res.status(501).json(error.message)
        
    }
}

// update product by id
const updateProductById=async(req,res)=>{
    const id=req.params.id;
    try {
        let product=await Products.findByIdAndUpdate(id,req.body,{new:true})
        if(!product){
            return res.json({message:'invalid Id'})
        }
        res.status(200).json({message:" Product has been updated successfully...!",product})
    } catch (error) {
        res.status(501).json(error.message)
        
    }
}

// delete product by id
const deleteProductById=async(req,res)=>{
    const id=req.params.id;
    try {
        let product=await Products.findByIdAndDelete(id)
        if(!product){
            return res.json({message:'invalid Id'})
        }
        res.status(200).json({message:" Product has been deleted successfully...!",product})
    } catch (error) {
        res.status(501).json(error.message)
    }
}


module.exports={addProduct,getProduct,getProductById,updateProductById,deleteProductById}