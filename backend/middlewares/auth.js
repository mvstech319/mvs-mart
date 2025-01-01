const jwt = require('jsonwebtoken');
const User = require('../models/user_schema');

const Authenticated = async (req, res, next) => {
    const token = req.header('Auth');
    if (!token) {
        return res.status(401).json({ message: "Login First" });
    }

    try {
        const decode = jwt.verify(token,"@#$*&^%##%^");
        const id = decode.userId;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid or expired token", error: error.message });
    }
};

module.exports = { Authenticated };
