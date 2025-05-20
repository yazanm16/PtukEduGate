const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const folder = path.resolve(__dirname, '..', '..', '..', 'public', 'uploads', 'video');
        fs.mkdirSync(folder, { recursive: true });
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '_' + file.originalname;
        cb(null, uniqueName);
    }

});

const uploadVideo = multer({ storage });

module.exports = uploadVideo;
