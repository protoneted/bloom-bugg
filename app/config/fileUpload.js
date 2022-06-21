// const path = require('path');
const env = require('../config/env');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
// var multerS3 = require('multer-s3');
// var AWS = require('aws-sdk/clients/s3');
// const sharp = require("sharp");
// var S3 = require('aws-sdk/clients/s3');
// const fs = require('fs')

// const bucketName = env.AWS_BUCKET_NAME
// const region = env.AWS_BUCKET_REGION
// const accessKeyId = env.AWS_ACCESS_KEY
// const secretAccessKey = env.AWS_SECRET_KEY

// const s3 = new S3({
//     region,
//     accessKeyId,
//     secretAccessKey
// })

// function uploadFile(file) {
//     try {
//         const fileStream = fs.createReadStream(file.path)
//         const uploadParams = {
//             Bucket: bucketName,
//             Body: fileStream,
//             Key: file.filename,
//             ACL: 'public-read',
//         }
//         sharp(file.path)
//             .resize({
//                 width: 150,
//                 height: 97
//             })
//             .toFormat("jpeg", { mozjpeg: true })
//             // .toFile("sammy-resized-compressed.jpeg");
//         return s3.upload(uploadParams).promise()
//     } catch (e) {
//         console.log(e)
//     }

// }



// async function resizeImage() {
//     try {
//         await sharp(file.path)
//             .resize({
//                 width: 150,
//                 height: 97
//             })
//             .toFormat("jpeg", { mozjpeg: true })
//             .toFile("sammy-resized-compressed.jpeg");
//     } catch (error) {
//         console.log(error);
//     }
// }

// resizeImage();

// exports.uploadFile = uploadFile




// ------------------------------------------------------------------ma'am----------------------------------------------------------
// region = process.env.AWS_BUCKET_REGION;
// accessKeyId = 'AKIASUT7TAP7Y4IJ4TUO';
// secretAccessKey = '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';

// const s3 = new AWS({
//     region,
//     accessKeyId,
//     secretAccessKey
// })

// exports.upload = multer({
//     storage: multerS3({
//         s3: s3,
//         acl: 'public-read',
//         bucket: 'bloom-img',
//         metadata: function (req, file, cb) {
//             cb(null, { fieldName: file.fieldname });
//         },
//         key: function (req, file, cb) {
//             cb(null, new Date().toISOString() + '-' + file.originalname);
//         }
//     }),
//     limits: { fileSize: 1024 * 1024 * 50 }, // 50MB
//     fileFilter: function (req, file, cb) {
//         const filetypes = /jpeg|jpg|png/;
//         const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//         const mimetype = filetypes.test(file.mimetype);
//         if (mimetype && extname) {
//             return cb(null, true);
//         } else {
//             cb("Invalid file type. Allow images only of extensions jpeg|jpg|png !");
//         }
//     }
// });

// ----------------------------------------------------------------------------------umang-----------------------------------------------
// const fileStorageEngine = multer.diskStorage({
//     destination: function (req, file, cb) {
//         if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
//             cb(null, './uploads/')
//         } else {
//             cb(null, 'Please enter only Image');
//         }
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + file.originalname);
//     },
// })

// const upload = multer({ storage: fileStorageEngine })

// module.exports = upload;


// ----------------------------------------------------------------------------------prasad-----------------------------------------------




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage })



module.exports = upload