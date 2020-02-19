const { Schema, model } = require('mongoose');

const schema = {
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
      require: true
    }
  ],
  messages: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        require: true
      },
      message: {
        type: String,
        require: true
      },
      time: {
        type: Date,
        default: Date.now
      }
    }
  ]
};

const chatRoom_schema = new Schema(schema, { collection: 'chatRoom' });
const ChatRoom = model('chatRoom', chatRoom_schema);

module.exports = ChatRoom;