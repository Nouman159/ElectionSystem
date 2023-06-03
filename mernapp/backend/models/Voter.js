const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cnic: {
        type: String,
        required: true,
        unique: true
    },
    hasVoted: {
        type: Boolean,
        default: false,
    },
    isCandidate: {
        type: Boolean,
        default: false
    },
    constituency: {
        type: String,
    },

});
// voterSchema.virtual("url").get(function () {
//     // We don't use an arrow function as we'll need the this object
//     return `/voter/${this._id}`;
// });

const Voter = mongoose.model('Voter', voterSchema);

module.exports = Voter;
