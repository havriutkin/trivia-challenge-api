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

const uploadPicture = async (req, res) => {
    const {userId} = req.params;
    const url = '/public/profile_images/' + req.file.filename;
    const sql = 'UPDATE "user" SET image_url = $1 WHERE id = $2'
    const parameters = [url, userId];
    const data = await query(sql, parameters);
    res.status(201).json({message: 'Profile image uploaded.'});
}

module.exports = { getById, uploadPicture };