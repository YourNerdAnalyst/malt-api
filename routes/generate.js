const express = require('express');

const router = express.Router();
const multer = require('multer');
const { generateData, getGenerateUSer } = require('../controllers/genrate');


const storage = multer.diskStorage({});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == 'image/png' ||
            file.mimetype == 'image/jpg' ||
            file.mimetype == 'image/jpeg' ||
            file.mimetype == 'image/gif' ||
            file.mimetype == 'image/tiff' ||
            file.mimetype == 'image/bmp' ||
            file.mimetype == 'image/svg' ||
            file.mimetype == 'image/raw' ||
            file.mimetype == 'image/psd' ||
            file.mimetype == 'image/eps' ||
            file.mimetype == 'image/pdf' ||
            file.mimetype == 'image/ai' 
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    },
});




//signup at /api/user/signup
router.post('/generate-data', upload.single('image'), generateData);
router.get('/get-generate/:email', getGenerateUSer)



module.exports = { router }