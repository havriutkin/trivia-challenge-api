const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { query } = require('../config/db.config');

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
    const {username, password, email} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'SELECT register_user($1, $2, $3) AS user_id';
    const parameters = [username, hashedPassword, email];
    const data = await query(sql, parameters);

    try {
        res.status(201).json({
            id: data[0].user_id,
            message: "User was created."
        })
    } catch(err){
        console.log(err);
        res.status(500).send('Server error');
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM "user" WHERE username = $1';
    const data = await query(sql, [username]);
    
    if (data.length === 0)
        return res.status(401).json({message: "User doesn't exist."});

    if (!await bcrypt.compare(password, data[0].password))
        return res.status(401).json({message: "Invalid credentials."});

    const userData = {
        id: data[0].id,
        username: data[0].username,
        email: data[0].email,
        joindDate: data[0].join_date,
        profileImg: data[0].image_url
    };

    const token = jwt.sign(userData, JWT_SECRET, {expiresIn: '1h'});
    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict"
    });

    res.status(200).json({...userData, message: "Logged in."});
}

const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({message: 'Log out.'});
}

module.exports = {register, login, logout};