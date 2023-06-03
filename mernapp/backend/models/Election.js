const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    electionDate: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'running', 'completed'],
        default: 'pending',
    },
    endTime: {
        type: String,
        required: true,
    },
    constituencies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Constituency',
    }],
}, { timestamps: true });

const Election = mongoose.model('Election', electionSchema);

module.exports = Election;
