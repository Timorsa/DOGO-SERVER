const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = {
    userName: {
        type:String,
        require: true,
    },
    firstName:  {
        type:String,
        require: true,
    },
    lastName:  {
        type:String,
        require: true,
    },
    email:  {
        type:String,
        require: true,
        unique: true
    },
    userType: {
        type:String,
        enum: ['local', 'facebook', 'google'],
        default: 'local'
    },
    password: {
        type:String,
        require: true
    },
    profilePicture: {
        type: String,
        default: ''
    },
    coverPicture: {
        type: String,
        default: ''
    },
    pets: [{   
        id: {
            type: Schema.Types.ObjectId,
            ref: 'pet',
            require: true
          }
    }],
    isOnline: {
        type: Boolean,
        default: false
    },
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
        require: true
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
        require: true
    }],
    notifications: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            require: true
        },
        text: {
            type: String,
            require: true
        },
        date: {
            type: Date,
            default: Date.now
          }
    }]
    };

const user_schema = new Schema(schema, { collection: 'user' });
// hashes the password before saving
user_schema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

user_schema.methods.comparePassword = async (candidatePassword, next) => {
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};

const User = model('user', user_schema);

module.exports = User;

    
// double check about the pre save feature

