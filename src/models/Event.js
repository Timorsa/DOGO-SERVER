const { Schema, model } = require('mongoose');

const schema = {
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    require: true
  },
  name: {
    type: String,
    require: true
  },
  info: {
    type: String,
    require: true
  },
  location: {
    name: {
      type: String,
      require: true
    },
    cordinates: {
      lat: Number,
      lang: Number
    }
  },
  time: {
    type: Date,
    require: true,
    default: Date.now()
  },
  going: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        require: true,
        unique: true
      },
      approved: {
        type: Boolean,
        default: false
      }
    }
  ],
  intrested: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
      require: true,
      unique: true
    }
  ]
};

const event_schema = new Schema(schema, { collection: 'event' });
const Event = model('event', event_schema);

module.exports = Event;
