const express = require('express');
const router = express.Router();

const petCtrl = require('../controllers/petCtrl');

router.post('/create', petCtrl.create);

router.get('/find', petCtrl.findPets);
router.get('/findOne', petCtrl.findPet);

router.put('/update/age', petCtrl.updateAge);
router.put('/update/size', petCtrl.updateSize);
router.put('/update/breed', petCtrl.updateBreed);
router.put('/update/weight', petCtrl.updateWeight);
router.put('/update/picture', petCtrl.updatePicture);

router.delete('/', petCtrl.delete);

module.exports= router;