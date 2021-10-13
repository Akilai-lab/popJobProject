const express = require('express');
const router = express.Router();

const profil = require('../controllers/profil');
const auth = require('./../middleware/auth');
const multer = require('./../middleware/multer-config')

router.get('/getInfo', auth, multer, profil.gettInfo);
router.post('/domaine', profil.postDomaine);
router.put('/', auth, multer, profil.updateProfil);
router.post('/dispoFilters', profil.filterDispo);
module.exports = router;