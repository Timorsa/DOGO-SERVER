const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res, next) => {
  const { userName, password } = req.body;
  try {
    let user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, 'mysecret', { expiresIn: 36000000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    next({
      status: 500,
      message: 'Server Error'
    });
  }
};
