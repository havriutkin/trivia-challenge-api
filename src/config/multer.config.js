const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/profile_images');
    },
    filename: function (req, file, cb) {
        const { userId } = req.params;
        cb(null, `profileImg${userId}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;