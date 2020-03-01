const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/postCtrl');

router.get('/byUser/:id', postCtrl.PostsByUser);
router.get('/byUsers', postCtrl.PostsByUsers);

router.post('/create', postCtrl.createPost);

router.put('/edit', postCtrl.editPost);
router.put('/bone', postCtrl.bonePost);
router.put('/unBone', postCtrl.unBonePost);
router.put('/comment', postCtrl.Comment);
router.put('/comment/edit', postCtrl.editComment);
router.put('/comment/bone', postCtrl.boneComment);
router.put('/comment/unbone', postCtrl.editComment);

router.delete('/', postCtrl.delPost);
router.delete('/comment', postCtrl.delComment);

module.exports = router;
