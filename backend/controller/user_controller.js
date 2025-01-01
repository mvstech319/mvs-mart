const User=require('../models/user_schema')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')
const register = async (req, res) => {
    const { name, email, password } = req.body;

    // Strong password validation regex
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    try {
        // Check if password meets strength requirements
        if (!strongPasswordRegex.test(password)) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
                success: false
            });
        }

        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        }

        // Hash the password
        const hashPass = await bcrypt.hash(password, 10);

        // Create a new user
        user = await User.create({ name, email, password: hashPass });
        res.status(200).json({
            message: 'User registered successfully!',
            user,
            success: true
        });
    } catch (error) {
        console.error(error, 'Error during user registration');
        res.status(500).json({ message: 'Internal server error' });
    }
};


 //login user
 const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if the user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        // Check if the password is valid
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid Credentials",success: false });
        }
        const token=jwt.sign({userId:user._id},"@#$*&^%##%^",{
            expiresIn:'365d'
        })

        // Successful login response
        return res.status(200).json({ message: `Welcome ${user.name}`,token, success: true});

    } catch (error) {
        // Error handling
        return res.status(500).json({ message: error.message });
    }
};


// get user

const user = async(req,res)=>{
    try {
        let users =await User.find().sort({createdAt:-1});
        res.status(200).json(users)
    } catch (error) {
        res.status(501).json(error.message)
        
    }
};

//get profile
const profile =async(req,res)=>{
    res.json({user:req.user})
}


 module.exports={register , login , user,profile}