const multer = require('multer');
const path = require('path');
const fs = require('fs');

const allowedTypes = ['book', 'exam', 'slide', 'summary', 'video'];

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const type = req.body.uploaded_type;

        if (!allowedTypes.includes(type)) {
            return cb(new Error('Invalid uploaded_type value'), null);
        }

        const folder = path.resolve(__dirname, '..', '..', '..', 'public', 'uploads', type);
        console.log("Destination folder:", folder);
        fs.mkdirSync(folder, { recursive: true });
        cb(null, folder);
    },
    filename: function (req, file, cb) {
       // console.log("File received:", file.originalname);
        const uniqueName = Date.now() + '_' + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (!req.body.uploaded_type || !allowedTypes.includes(req.body.uploaded_type)) {
            return cb(new Error("uploaded_type is required and must be valid"), false);
        }
        cb(null, true);
    }
});

module.exports = upload;
