const { Schema, model } = require('mongoose');
//const User = require('./User');

const schema = {
  publisher: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    require: true
  },
  content: {
    type: String,
    require: true
  },
  time: {
    type: Date,
    default: Date.now
  },
  comments: [
    {
      publisher: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        require: true
      },
      content: {
        type: String,
        require: true
      },
      time: {
        type: Date,
        default: Date.now
      },
      bones: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user',
            require: true
        }
      ],
    }
  ],
  bones: [{
    publisher :{
        type: Schema.Types.ObjectId,
        ref: 'user',
        require: true
    }
}
  ]
};

const post_schema = new Schema(schema, { collection: 'post' });
const Post = model('post', post_schema);

module.exports = Post;
