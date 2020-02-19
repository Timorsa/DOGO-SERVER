const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/userCtrl');

const { signup } = require('../handlers/auth');

router.post('/signup', signup);

router.get('/find', usersCtrl.findUser);
router.get('/findUsers', usersCtrl.getUsersById);
router.get('/notifications', usersCtrl.getNotifications);

router.put('/follow', usersCtrl.followUser);
router.put('/unFollow', usersCtrl.unFollowUser);
router.put('/update/email', usersCtrl.updateMail);
router.put('/update/profilePicture', usersCtrl.changeProfilePic);
router.put('/update/coverPicture', usersCtrl.changeCoverPic);



module.exports = router;

// del login auth