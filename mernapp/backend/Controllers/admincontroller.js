const Party = require('../models/Party');
const Candidate = require('../models/Candidate');
const Constituency = require('../models/Constituency');
const Voter = require('../models/Voter');
const jwt = require('jsonwebtoken');
const jwtSecret = "Mynameisabcdefghijklmnopqrstuvwxyz";

const createConstituency = async (req, res) => {
    const { name, location } = req.body;

    try {
        // Check if the constituency with the given name already exists
        const existingConstituency = await Constituency.findOne({ name });
        if (existingConstituency) {
            return res.status(400).json({ success: false, message: 'Constituency with the same name already exists' });
        }

        // Create a new constituency instance
        const constituency = new Constituency({
            name,
            location,
        });

        // Save the constituency to the database
        await constituency.save();

        res.status(201).json({ success: true, message: 'Constituency created successfully' });
    } catch (error) {
        console.error('Error creating constituency:', error);
        res.status(500).json({ success: false, message: 'Failed to create constituency' });
    }
};



const createCandidate = async (req, res) => {
    const { party_name, constituency, name, cnic } = req.body;

    try {
        const candidate = new Candidate({
            party_name,
            constituency,
            name,
            cnic,
        });

        await candidate.save();
        const voter = await Voter.findOne({ cnic: cnic });

        if (!voter) {
            console.log("No such person exists");
        } else {
            await Voter.findOneAndUpdate(
                { cnic },
                { $set: { isCandidate: true } },
                { new: true }
            );
        }
        const data = {
            user: {
                id: voter.id,
            }
        }
        const candidateToken = jwt.sign(data, jwtSecret);


        res.status(201).json({ success: true, message: 'Candidate created successfully', candidateToken: candidateToken, id: candidate._id });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create candidate', error: error.message });
    }
};


// Create a new party
const createParty = async (req, res) => {
    try {
        // Extract the party details from the request body
        const { name, abbreviation, symbol, foundedYear, ideology, description, leader } = req.body;

        // Create a new party instance
        const party = new Party({
            name,
            abbreviation,
            symbol,
            foundedYear,
            ideology,
            description,
            leader
        });

        // Save the party to the database
        await party.save();

        res.status(201).json({ success: true, message: 'Party created successfully' });
    } catch (error) {
        console.error('Error creating party:', error);
        res.status(500).json({ success: false, message: 'Failed to create party' });
    }
};


module.exports = {
    createCandidate,
    createConstituency,
    createParty
};
