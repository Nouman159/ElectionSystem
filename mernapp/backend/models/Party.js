const mongoose = require('mongoose');

const partySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    abbreviation: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    foundedYear: {
        type: Number,
        required: true
    },
    ideology: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    leader: {
        type: String,
        required: true
    }

});

const Party = mongoose.model('Party', partySchema);

module.exports = Party;
