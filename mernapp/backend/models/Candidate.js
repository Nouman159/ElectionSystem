const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    party_name: {
        type: String,
        required: true
    },
    constituency: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
      },
      cnic: {
        type: String,
        required: true,
      },
    vote_count: {
        type: Number,
        default: 0
    }
});

const Candidate = mongoose.model('Candidate', candidateSchema);
module.exports = Candidate;
