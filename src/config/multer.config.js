const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/profile_images');
    },
    filename: function (req, file, cb) {
        const { id } = req.user;
        cb(null, `profileImg${id}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;