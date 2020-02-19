const { Schema, model } = require('mongoose');

const schema = {
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    profilePic: {
        type: String,
        default: ''
    }
}