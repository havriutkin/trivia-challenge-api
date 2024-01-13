const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({message: "Authorization is required."});
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
    } catch(err){
        return res.status(401).json({message: "Invalid token"});
    }
    return next();
}

module.exports = {authMiddleware};