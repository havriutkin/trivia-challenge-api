const express = require('express');
const router = express.Router()

const { register, login, logout } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/validate', authMiddleware, (req, res) => res.status(200).json({message: 'Valid.'}));
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout)

module.exports = router;