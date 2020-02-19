const { Schema, model } = require('mongoose');

const schema = {
    name: {
        type: String,
        require: true
    },
    picture: {
        type: String,
        default: ''
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    MedicalFile : {
        type: Schema.Types.ObjectId,
        ref: 'medicalFile'
    },
    breed: {
        type: String,
        default: 'not-specified'
    },
    size: {
        type: String,
        enum: ['small', 'medium', 'big', 'huge', 'not-specified'],
        default: 'not-specified'
    },
    age: Number,
    weight: Number
}

const pet_schema = new Schema(schema, { collection: 'pet' });
const Pet = model('pet', pet_schema);

module.exports = Pet;
