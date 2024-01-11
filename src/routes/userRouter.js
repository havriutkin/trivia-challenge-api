const express = require('express');
const router = express.Router()
const upload = require('../config/multer.config'); // For file uploads

const { getById, uploadPicture } = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/:userId', getById);
router.post('/uploadPicture/:userId', upload.single('profileImg'), uploadPicture);

module.exports = router