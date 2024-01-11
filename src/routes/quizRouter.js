const express = require('express');
const router = express.Router()

const {add, getByUserId, generateQuiz} = require('../controllers/quizController');
const {authMiddleware} = require('../middleware/authMiddleware');


router.get('/generate', generateQuiz);
router.get('/:userId', getByUserId);
router.post('/add', add);

module.exports = router