const express = require('express');
const { addAddress, getAddress } = require('../controller/address_controller');
const { Authenticated } = require('../middlewares/auth');
const router = express.Router();


// add address
router.post('/add',Authenticated,addAddress);

//get address
router.get('/get',Authenticated,getAddress)

module.exports=router