const mongoose = require('mongoose');

//Schema
const usersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    },
}, {
    timestamp: true
});

//Using schema via model. If user collection is not created, it creates them automatically
//Model name is added as collection
const User = mongoose.model('user', usersSchema);

module.exports = User;