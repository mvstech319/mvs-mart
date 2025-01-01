const mongoose = require('mongoose');

const ConnectDB=async()=>{
    if(!process.env.MONGO_URI){
        console.error(error,"MONGO_URI is not define in .env")
        process.exit(1);
    }
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongodb connected :${conn.connection.host}`);
    } 
    catch (error) {
       console.error(`database connection: ${error.message}`) ;
    }
}

module.exports=ConnectDB;