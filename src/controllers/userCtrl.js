const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { unFollow } = require('../handlers/user');
const { notifyFollow } = require('../handlers/notify');

// at the end wrap everything with module exports

// get user by username / email / id
// get users by arrray of ids
// get pet ids

// follow
// unfollow

//update mail
//update password
//update profile pic
//update cover pic

//delete pet
//delete account

module.exports = {
  // check what to do when none user found
  async signIn(req, res, next) {
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user._id,
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
          profilePicture: user.profilePicture,
          coverPicture: user.coverPicture
        }
      };

      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      next({
        status: 500,
        message: 'no such user'
      });
    }
  },
  async signUp(req, res, next) {
    const {
      userName,
      firstName,
      lastName,
      email,
      password,
      profilePicture,
      coverPicture
    } = req.body;
    try {
      let user = await User.findOne({ userName });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        userName,
        firstName,
        lastName,
        email,
        password,
        profilePicture,
        coverPicture
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id,
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
          profilePicture: user.profilePicture,
          coverPicture: user.coverPicture
        }
      };

      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: 36000000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      next({
        status: 500,
        message: 'Server Error'
      });
    }
  },
  async findUser(req, res, next) {
    try {
      const user = await User.find({
        $or: [
          { userName: req.body.userName },
          { _id: req.body.id },
          { email: req.body.email }
        ]
      });
      res.status(200).json(user);
    } catch (err) {
      next({
        status: 500,
        message: 'no such user'
      });
    }
  },
  async getUsersById(req, res, next) {
    try {
      const users = await User.find({ _id: { $in: req.body.users } });
      res.status(200).json(users);
    } catch (err) {
      next({
        status: 500,
        message: 'no users found'
      });
    }
  },
  async followUser(req, res, next) {
    try {
      const user = await User.updateOne(
        { _id: req.body.id },
        { $push: { following: req.body.followId } }
      );
      await notifyFollow(req, res, next);
      res.status(200).json(user);
    } catch (err) {
      next({
        status: 500,
        message: 'couldnt follow user'
      });
    }
  },
  async unFollowUser(req, res, next) {
    try {
      const user = await User.updateOne(
        { _id: req.body.id },
        { $pull: { following: req.body.followId } }
      );
      await unFollow(req, res, next);
      res.status(200).json(user);
    } catch (err) {
      next({
        status: 500,
        message: 'couldnt un-follow user'
      });
    }
  },
  async updateMail(req, res, next) {
    try {
      const updatedUser = await User.updateOne(
        { _id: req.body.id },
        { $set: { email: req.body.email } }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next({
        status: 500,
        message: 'couldnt update mail'
      });
    }
  },
  async changeProfilePic(req, res, next) {
    try {
      const updatedUser = await User.updateOne(
        { _id: req.body.id },
        { $set: { profilePicture: req.body.profilePicture } }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next({
        status: 500,
        message: 'couldnt update profile Picture'
      });
    }
  },
  async changeCoverPic(req, res, next) {
    try {
      const updatedUser = await User.updateOne(
        { _id: req.body.id },
        { $set: { coverPicture: req.body.coverPicture } }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next({
        status: 500,
        message: 'couldnt update cover Picture'
      });
    }
  },
  async getNotifications(req, res, next) {
    try {
      const user = await User.findById(req.body.id);
      res.status(200).json(user.notifications);
    } catch (err) {
      next({
        status: 500,
        message: 'couldnt retrieve notifications'
      });
    }
  }
};
