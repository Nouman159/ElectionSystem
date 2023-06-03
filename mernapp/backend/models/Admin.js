const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    voter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voter'
    },
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate'
    },
    party: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Party'
    },
    constituency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Constituency'
    }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
