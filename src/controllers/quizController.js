const { query } = require('../config/db.config');
const requestQuestions = require('../services/externalAPI');

const add = async (req, res) => {
    const { userId } = req.user;
    const { difficulty, questionsTotal, right_answers, topic } = req.body;
    const sql = "CALL add_quiz_info($1, $2, $3, $4, $5);"
    const parameters = [userId, difficulty, questionsTotal, right_answers, topic];
    const _ = await query(sql, parameters);
    res.status(201).json({message: 'Quiz Info added'});
}

const getByUserId = async (req, res) => {
    const {userId} = req.params;
    const sql = "SELECT * FROM quiz WHERE user_id = $1";
    const parameters = [userId];
    const data = await query(sql, parameters);
    res.status(200).json({message: "Statistics found.", statistics: data});
}

const generateQuiz = async (req, res) => {
    const {numberOfQuestions, topic, difficulty} = req.query;
    const questions = await requestQuestions(numberOfQuestions, topic, difficulty);
    res.status(200).json({questions: questions});
}

module.exports = {add, getByUserId, generateQuiz}