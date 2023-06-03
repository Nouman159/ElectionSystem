const Voter = require('../models/Voter');

const asyncHandler = require('express-async-handler')
const { body, validationResult } = require("express-validator");

exports.voter_home = async (req, res, next) => {
    try {
        const loggedInVoter = await Voter.findById({_id : _id})
        console.log(loggedInVoter);
        res.send({
            data: loggedInVoter
        });
    } catch (error) {
        console.error('Error finding voters:', error);
        res.status(500).send('Internal Server Error');
    }
};


