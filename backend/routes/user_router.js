const express=require("express");
const { register, login, user, profile } = require("../controller/user_controller");
const { Authenticated } = require("../middlewares/auth");
const router=express.Router();

// register user
router.post('/register',register)

// login user
router.post('/login',login)

// get user
router.get('/all',user)

// get profile
router.get('/profile',Authenticated,profile)

module.exports=router