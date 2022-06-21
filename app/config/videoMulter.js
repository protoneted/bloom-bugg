const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const fileSize = parseInt(req.headers["content-length"])
        var ext = path.extname(file.originalname)
        if ((ext === '.mov' || ext === '.mp4' || ext === '.mkv')) {
            cb(null, './uploads/')
        } else {
            cb('Please enter only Video');
        }
    },

    filename: function (req, file, cb) {
        cb(null, "video-" + Date.now() + path.extname(file.originalname));
    }
});

const uploadV = multer({ storage: storage })

// && fileSize < 10000000

module.exports = uploadV