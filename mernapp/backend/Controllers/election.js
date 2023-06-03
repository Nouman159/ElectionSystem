const mongoose = require('mongoose');
const Election = require('../models/Election');
// const Constituency = require('../models/Constituency');
const moment = require('moment');

const createElection = async (req, res) => {
    const { name, electionDate, startTime, endTime } = req.body;

    try {
        // Parse the incoming date and time strings
        const parsedElectionDate = moment(electionDate);
        const parsedStartTime = moment(startTime, 'h:mm A');
        const parsedEndTime = moment(endTime, 'h:mm A');

        // Check if the parsed dates and times are valid
        if (!parsedElectionDate.isValid() || !parsedStartTime.isValid() || !parsedEndTime.isValid()) {
            return res.status(400).json({ success: false, message: 'Invalid date or time' });
        }

        // Combine the parsed election date with the parsed start and end times
        const combinedStartDate = moment(parsedElectionDate).set({
            hour: parsedStartTime.hour(),
            minute: parsedStartTime.minute(),
            second: 0,
            millisecond: 0,
        });
        const combinedEndDate = moment(parsedElectionDate).set({
            hour: parsedEndTime.hour(),
            minute: parsedEndTime.minute(),
            second: 0,
            millisecond: 0,
        });

        // Validate the combined start and end dates against your specific criteria
        if (combinedStartDate.isBefore(moment())) {
            return res.status(400).json({ success: false, message: 'Start date must be in the future' });
        }
        if (combinedEndDate.isBefore(combinedStartDate)) {
            return res.status(400).json({ success: false, message: 'End date must be after start date' });
        }

        // Rest of your code to save the election to the database
        // Create a new instance of the Election model with the parsed data
        const election = new Election({
            name,
            electionDate: parsedElectionDate.toDate(),
            startTime: parsedStartTime.format('h:mm A'),
            endTime: parsedEndTime.format('h:mm A'),
        });

        // Save the election to the database
        const savedElection = await election.save();

        res.status(201).json({ success: true, message: 'Election created successfully' });
    } catch (error) {
        console.error('Error creating election:', error);
        res.status(500).json({ success: false, message: 'Failed to create election' });
    }
};

const electionEvents = async (req, res) => {
    try {
        const requiredEvents = await Election.find({ status: 'pending' });
        if (!requiredEvents) {
            return res.status(500).json({ success: false, message: 'Election not found' });
        }
        console.log(requiredEvents);
        return res.status(200).json({ success: true, data: requiredEvents, message: 'Election found successfully' });


    }
    catch (err) {
        console.log("Not Found Any record", err);
        return res.status(500).json({ success: false, message: 'Internal server error' });

    }
}

module.exports = { createElection, electionEvents };
