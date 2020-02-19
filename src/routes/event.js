const express = require('express');
const router = express.Router();

const eventCtrl = require('../controllers/eventCtrl');

router.get('/user', eventCtrl.eventsByUser);
router.get('/users', eventCtrl.eventsByUsers);
router.get('/name', eventCtrl.findEventByName);

router.post('/create', eventCtrl.createEvent);

router.put('/interested', eventCtrl.interested);
router.put('/going', eventCtrl.registerReq);






module.exports = router;