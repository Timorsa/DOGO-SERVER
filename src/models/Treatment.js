const { Schema, model } = require('mongoose');

const schema = {
  pet_Id: {
    type: Schema.Types.ObjectId,
    ref: 'pet',
    require: true
  },
  date: {
    type: String
  },
  type: {
    type: String
  },
  description: {
    type: String
  }
};

module.exports = Treatment;
