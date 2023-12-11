const express = require('express');

const multer = require('multer');
const { login, signUp, crm } = require('../controllers/user');


const router = express.Router();



//signup at /api/user/signup
router.post('/signup', signUp);

//login a /api/user/login
router.post("/login", login)

//crm form at /api/user/crm
router.post("/crm", crm)


module.exports = { router }
