const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {

}

exports.signup = async (req, res, next) => {
    try {
        //a. create user
        const user = await User.create(req.body);
        const { _id, userName, profilePicture, coverPicture } = user;
        //b.create a web token in order to de-crypt that into data we want to show up
        let token = jwt.sign(
          {
            _id,
            userName,
            profilePicture,
            coverPicture
          },
          process.env.SECRET_KEY
        );
        // c. return json to handle it later after request
        return res.status(200).json({
          user,
          token
        });
      } catch (err) {
        //if validation fails mongoose return 11000
        if (err.code === 11000) {
          err.message = 'Sorry, that username and/or email is already taken';
        }
        return next({
          status: 400,
          message: err.message
        });
      }
}
