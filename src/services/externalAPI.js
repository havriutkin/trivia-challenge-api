/* Interaction with public Trivia API */

const topics = require('../config/topics.config');

const requestQuestions = async (number, topic, difficulty) => {
    const baseUrl = 'https://opentdb.com/api.php';
    let topicId = topics[topic];
    if (!topicId) throw new Error('Invalid topic requested');
    if (topicId == 1) topicId = Math.floor(Math.random() * (32 - 9 + 1)) + 9;   // Random category
    const queryObject = {
        amount: number,
        category: topicId,
        difficulty: difficulty,
        type: 'multiple',
    }
    const query = new URLSearchParams(queryObject).toString();
    const data = await fetch(baseUrl + '?' + query).then(res => res.json());
    return data.results;
}

module.exports = requestQuestions;
