// const multer = require('multer')

// const fileStorageEngine = multer.diskStorage({
//     destination: function (req, file, cb) {
//         if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
//             cb(null, './uploads')
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



// --------------------------------------------------------------------------prasad---------------------------------------------------------------------------------


const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
const env = require('../config/env');


const sharpCompresion = async (req) => {
    const { filename: image } = req.file;
    // console.log(`${__dirname}/${req.file.path}`);

    // console.log(image, req.file.path, req.file.destination, "sdfsdfsd");
    try {
        await sharp(req.file.path)
            .resize({
                width: null,
                height: null
            })
            .withMetadata()
            .toFormat("jpeg", { mozjpeg: true })
            .toFile(path.resolve(req.file.destination, "image-" + image));
        fs.unlinkSync(`${req.file.destination}/${image}`)
        return `${env.imageURL}${req.file.destination}image-${image}`
    } catch (err) {
        console.log(err);
        return { error: err }
    }

}


module.exports = { sharpCompresion }