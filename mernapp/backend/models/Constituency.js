const mongoose = require('mongoose');

const constituencySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

const Constituency = mongoose.model('Constituency', constituencySchema);

module.exports = Constituency;
