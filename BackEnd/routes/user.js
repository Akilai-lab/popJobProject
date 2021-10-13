const express = require('express');
const router = express.Router();

const users = require('../controllers/user');
const auth = require('./../middleware/auth');
const multer = require('./../middleware/multer-config')
router.get('/statusUser', auth, users.aboutHim);
router.get('/allUser', users.allUsers);
router.post('/signup', users.signup);
router.post('/login' ,users.login);
module.exports = router;