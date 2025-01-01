const express=require('express');
const { addProduct, getProduct, getProductById, updateProductById, deleteProductById } = require('../controller/product_controller');
const router=express.Router();

// add product Routes

router.post("/add",addProduct)

//get product Routes
router.get("/get",getProduct)

//find product by id
router.get("/:id",getProductById)

//find product by id
router.put("/:id",updateProductById)

//delete product by id
router.delete("/:id",deleteProductById)

module.exports=router