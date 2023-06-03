const mongoose = require('mongoose');

const votingResultSchema = new mongoose.Schema({
    election: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Election',
        required: true
    },
    constituency: {
        type: String,
        required: true
    },
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate',
        required: true
    },
    voteCount: {
        type: Number,
        default: 0
    },
    isWinner: {
        type: Boolean,
        default: false
    }
});

const VotingResult = mongoose.model('VotingResult', votingResultSchema);

module.exports = VotingResult;
