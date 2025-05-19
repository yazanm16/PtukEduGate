const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const folder = path.resolve(__dirname, '..', '..', '..', 'public', 'uploads', 'summary');
        fs.mkdirSync(folder, { recursive: true });
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '_' + file.originalname;
        cb(null, uniqueName);
    }

});

const uploadSummary = multer({ storage });

module.exports = uploadSummary;
