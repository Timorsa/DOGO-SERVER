const Post = require('../models/Post');
const User = require('../models/User');

const { notifyPost } = require('../handlers/notify');

module.exports = {
  async createPost(req, res, next) {
    try {
      const post = await Post.create(req.body);
      // .populate('publisher', ['profilePicture', 'userName', 'firstName', 'lastName']);
      res.status(200).json(post);
    } catch (err) {
      next({
        status: 500,
        message: 'failed to make post'
      });
    }
  },
  async PostsByUser(req, res, next) {
    try {
      const posts = await Post.find({
        publisher: req.params.id
      }).populate('publisher', [
        'profilePicture',
        'userName',
        'firstName',
        'lastName'
      ]);
      res.status(200).json(posts);
    } catch (err) {
      next({
        status: 500,
        message: 'couldnt get user posts'
      });
    }
  },
  async PostsByUsers(req, res, next) {
    try {
      const posts = Post.find({
        publisher: { $in: req.body.users }
      }).populate('publisher', [
        'profilePicture',
        'userName',
        'firstName',
        'lastName'
      ]);
      res.status(200).json(posts);
    } catch (err) {
      next({
        status: 500,
        message: 'couldnt get posts'
      });
    }
  },
  async editPost(req, res, next) {
    try {
      const post = await Post.updateOne(
        { _id: req.body.id },
        { $set: { content: req.body.content } }
      );
      res.status(200).json(post);
    } catch (err) {
      next({
        status: 500,
        message: 'couldnt edit comment'
      });
    }
  },
  // notify fix
  async bonePost(req, res, next) {
    try {
      const post = await await Post.findById(req.body.id);
      post.bones.push(req.body.boneId);
      post.save();

      const notiData = {
        id: post.publisher,
        userName: req.body.userName,
        type: 'postBone'
      };

      await notifyPost(notiData);

      res.status(200).json(post.bones);
    } catch (err) {
      next({
        status: 500,
        message: 'couldnt bone post'
      });
    }
  },
  async unBonePost(req, res, next) {
    try {
      const post = await Post.findById(req.body.id);
      post.bones.pull(req.body.boneId);
      post.save();
      res.status(200).json(post.bones);
    } catch (err) {
      next({
        status: 500,
        message: 'couldnt un-bone post'
      });
    }
  },
  async Comment(req, res, next) {
    try {
      const comment = {
        publisher: req.body.publisher,
        content: req.body.content
      };

      const post = await Post.findById(req.body.id);
      post.comments.push(comment);
      post.save();

      const notiData = {
        id: post.publisher,
        userName: req.body.userName,
        type: 'postComment'
      };

      await notifyPost(notiData);

      res.status(200).json(post);
    } catch (err) {
      next({
        status: 500,
        message: 'couldnt comment post'
      });
    }
  },
  // fix doesnt work
  async editComment(req, res, next) {
    try {
      const post = await Post.updateOne(
        {
          _id: req.body.id,
          comments: {
            $elemMatch: {
              _id: req.body.commentId,
              publisherId: req.body.publisherId
            }
          }
        },
        { $set: { 'comments.$.content': req.body.content } }
      );
      res.status(200).json(post);
    } catch (err) {
      next({
        status: 500,
        message: 'failed to edit comment'
      });
    }
  },
  //check
  async delComment(req, res, next) {
    try {
      const post = await Post.updateOne(
        { _id: req.body.id },
        {
          $pull: { comments: { _id: req.body.commentId } }
        }
      );
      res.status(200).json(post);
    } catch (err) {
      next({
        status: 500,
        message: 'couldnt delete comment'
      });
    }
  },
  //check or fix
  async boneComment(req, res, next) {
    try {
      const post = await Post.updateOne(
        {
          _id: req.body.id,
          comments: {
            $elemMatch: {
              _id: req.body.commentId
            }
          }
        },
        { $push: { 'comments.$.bones': req.body.boneId } }
      );

      //   const notiData = {
      //     id: post.publisher,
      //     userName: req.body.userName,
      //     type: 'commentBone'
      //   }
      res.status(200).json(post);
    } catch (err) {
      next({
        status: 500,
        message: 'failed to bone comment'
      });
    }
  },
  // check
  async unBoneComment(req, res, next) {
    try {
      const post = await Post.updateOne(
        {
          _id: req.body.id,
          comments: {
            $elemMatch: {
              _id: req.body.commentId
            }
          }
        },
        { $pull: { 'comments.$.bones': req.body.boneId } }
      );

      res.status(200).json(post);
    } catch (err) {
      next({
        status: 500,
        message: 'failed to bone comment'
      });
    }
  },
  //check
  async delPost(req, res, next) {
    try {
      const post = await Post.deleteOne(
        { _id: req.body.postId },
        { publisherId: req.body.id }
      );
      res.status(200).json(user);
    } catch (err) {
      next({
        status: 500,
        message: 'couldnt delete post'
      });
    }
  }
};
