const { query } = require('../config/db.config');
const requestQuestions = require('../services/externalAPI');

const add = async (req, res, next) => {
    const { id } = req.user;
    const { difficulty, questionsTotal, rightAnswers, topic } = req.body;
    const sql = "CALL add_quiz_info($1, $2, $3, $4, $5);"
    const parameters = [id, difficulty, questionsTotal, rightAnswers, topic];
    try {
        const _ = await query(sql, parameters);
        res.status(201).json({message: 'Quiz Info added'});
    } catch(err) {
        next(err);
    }
}

const getByUserId = async (req, res, next) => {
    const {userId} = req.params;
    const sql = "SELECT * FROM quiz WHERE user_id = $1";
    const parameters = [userId];
    try {
        const data = await query(sql, parameters);
        res.status(200).json({message: "Quizes found.", quiz: data});
    } catch(err) {
        next(err);
    }
}

const generateQuiz = async (req, res, next) => {
    const {numberOfQuestions, topic, difficulty} = req.query;
    try {
        const quiz = await requestQuestions(numberOfQuestions, topic, difficulty);
        res.status(200).json({quiz: quiz});
    } catch(err) {
        next(err);
    }
}

module.exports = {add, getByUserId, generateQuiz}