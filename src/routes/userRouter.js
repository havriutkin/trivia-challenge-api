const express = require('express');
const router = express.Router()
const upload = require('../config/multer.config'); // For file uploads

const { getById, uploadPicture, getStatisticsById } = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/:userId', getById);
router.get('/statistics/:userId', getStatisticsById);
router.post('/picture', [authMiddleware, upload.single('profileImg')], uploadPicture);

module.exports = router