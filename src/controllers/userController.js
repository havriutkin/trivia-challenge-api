const { use } = require('../..');
const { query } = require('../config/db.config');

const getById = async (req, res) => {
    const { userId } = req.params;
    const sql = 'SELECT * FROM "user" WHERE id = $1';
    const parameters = [userId];
    const data = await query(sql, parameters);

    if (data.length === 0) return res.status(404).json({message: 'User not found.'});

    res.status(200).json({
        message: 'Information retrieved.',
        username: data[0].username,
        email: data[0].email,
        join_date: data[0].join_date,
        image_url: data[0].image_url
    })
}

const getStatisticsById = async (req, res) => {
    const {userId} = req.params;

    // Get quizzes from database
    const sql = "SELECT * FROM quiz WHERE user_id = $1";
    const parameters = [userId];
    const data = await query(sql, parameters);

    // Helper functions
    const sumByDifficulty = (difficulty) => data.reduce((acc, quiz) => 
            quiz.difficulty === difficulty ? acc + quiz.questions_total : acc, 0);
    
    const sumRightAnswersByDifficulty = (difficulty) => data.reduce((acc, quiz) => 
            quiz.difficulty === difficulty ? acc + quiz.questions_total : acc, 0);

    // Gather statistics
    // Number of questions
    const totalQuizes = data.length;
    const totalQuiestions = data.reduce((acc, quiz) => quiz.questions_total + acc, 0);
    const easyQuestions = sumByDifficulty('easy');
    const mediumQuestions = sumByDifficulty('medium');
    const hardQuestions = sumByDifficulty('hard');

    // Number of right answers
    const totalRightAnswers = data.reduce((acc, quiz) => quiz.right_answers + acc, 0);
    const easyRightAnswers = sumRightAnswersByDifficulty('easy');
    const mediumRightAnswers = sumRightAnswersByDifficulty('medium');
    const hardRightAnswers = sumRightAnswersByDifficulty('hard');

    // Topics
    const topics = data.reduce((acc, quiz) => {
        acc[quiz.topic] = (acc[quiz.topic] || 0) + 1;
        return acc;
    }, {});

    const statistics = {
        totalQuizes,
        totalQuiestions, easyQuestions, mediumQuestions, hardQuestions,
        totalRightAnswers, easyRightAnswers, mediumRightAnswers, hardRightAnswers,
        topics
    };

    res.status(200).json({message: "Statistics found.", data: statistics});
}

const uploadPicture = async (req, res) => {
    const {userId} = req.params;
    const url = '/public/profile_images/' + req.file.filename;
    const sql = 'UPDATE "user" SET image_url = $1 WHERE id = $2'
    const parameters = [url, userId];
    const data = await query(sql, parameters);
    res.status(201).json({message: 'Profile image uploaded.'});
}

module.exports = { getById, uploadPicture, getStatisticsById };