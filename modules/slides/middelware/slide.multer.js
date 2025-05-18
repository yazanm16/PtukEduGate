const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const folder = path.resolve(__dirname, '..', '..', '..', 'public', 'uploads', 'slide');
        fs.mkdirSync(folder, { recursive: true });
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '_' + file.originalname;
        cb(null, uniqueName);
    }

});

const uploadSlide = multer({ storage });

module.exports = uploadSlide;
