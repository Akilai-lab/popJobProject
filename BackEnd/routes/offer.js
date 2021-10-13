const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const project = require('../controllers/offer');

router.get('/Offers', auth,multer, project.getOffers);
router.get('/AllOffers', project.getAllOffers);
router.post('/newOffer', auth, multer, project.addOffer);
router.post('/typeEmploi', project.selectType);
module.exports = router;