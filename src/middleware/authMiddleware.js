const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1];
    if (!token) return res.status(401).json({message: "Authorization is required."});
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
}

module.exports = {authMiddleware};