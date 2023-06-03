const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const voterController = require('../Controllers/votercontroller');
const adminController = require('../Controllers/admincontroller');
const electionController = require('../Controllers/election');
const Party = require('../models/Party');
const Candidate = require('../models/Candidate');
const Voter = require('../models/Voter');
const voterResult = require('../models/votingResult')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const jwtSecret = "Mynameisabcdefghijklmnopqrstuvwxyz";
const Constituency = require('../models/Constituency');
const adminJwtSecret = 'electionmanagementadminishere';
const VotingResult = require('../models/votingResult');

router.post('/create-voting-results/:electionId', async (req, res) => {
    const { electionId } = req.params;
    try {
        // Retrieve all candidates
        const candidates = await Candidate.find();

        console.log('Total candidates:', candidates.length);

        // Check if candidates exist
        if (candidates.length === 0) {
            return res.status(404).json({ success: false, message: 'No candidates found.' });

        }

        // Iterate over the candidates and create a voting result instance for each candidate
        let createdCount = 0;
        for (const candidate of candidates) {
            const votingResult = new VotingResult({
                election: electionId,
                constituency: candidate.constituency,
                candidate: candidate._id,
            });
            await votingResult.save();
            console.log('Voting result instance created:', votingResult);
            createdCount++;
        }

        console.log('Total voting result instances created:', createdCount);

        res.status(200).json({ success: true, message: 'Voting results created successfully.' });
    } catch (error) {
        console.error('Error creating voting result instances:', error);
        res.status(500).json({ success: false, message: 'Failed to create voting results.' });
    }
});


router.get('/voter', voterController.voter_home);


router.post('/admin/create_party', adminController.createParty);
router.post('/admin/create_candidate', adminController.createCandidate);
router.post('/admin/create_constituency', adminController.createConstituency);

router.post('/admin/create_election', electionController.createElection);

router.get('/getElectionEvents', electionController.electionEvents);

router.post('/election/submit/:candidateId/:voterId', async (req, res) => {
    try {
        const { candidateId, voterId } = req.params;
        const selectedCandidate = await voterResult.findOne({ candidate: candidateId });
        const voteVoter = await Voter.findOne({ _id: voterId });
        if (!selectedCandidate) {
            console.log("candidate not found");
            return res.status(404).json({ message: 'Candidate not found' });
        }
        selectedCandidate.voteCount += 1;
        console.log(selectedCandidate);
        await selectedCandidate.save();
        console.log("Update candidate success");
        voteVoter.hasVoted = true;
        await voteVoter.save();
        console.log("Update voter success");

        console.log("saved success");
        return res.status(200).json({ success: true, vote: voteVoter.hasVoted, message: 'Vote submitted successfully' });

    } catch (err) {
        console.log("Error posting data ", err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
})

// GET route to fetch candidates for a specific constituency
router.get('/election_candidates/:constituency/:voterId', async (req, res) => {
    try {
        const { constituency, voterId } = req.params;
        // Find the candidates for the given constituency
        const candidates = await Candidate.find({ constituency: constituency });
        const thisVoter = await Voter.findOne({ _id: voterId });
        if (candidates.length === 0) {
            return res.status(404).json({ success: false, vote: thisVoter.hasVoted, message: 'No candidates found for the given constituency.' });
        }

        // Map the relevant data to be returned
        const candidateList = candidates.map(candidate => ({
            id: candidate._id,
            name: candidate.name,
            party: candidate.party_name,
        }));

        return res.json({ success: true, vote: thisVoter.hasVoted, candidates: candidateList });
    } catch (error) {
        console.error('Error fetching candidates:', error);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});


router.get('/voters/list/:candidateId', async (req, res) => {
    try {
        const candidate = await Candidate.findOne({ _id: req.params.candidateId });
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        const voters = await Voter.find({ constituency: candidate.constituency });

        res.status(200).json({ success: true, voters });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch voters' });
    }
});



router.get('/party/data', async (req, res) => {
    try {
        const parties = await Party.find().select('name');
        const constituencies = await Constituency.find().select('name');

        const partyNames = parties.map((party) => party.name);
        const constituencyNames = constituencies.map((constituency) => constituency.name);

        res.status(200).json({ success: true, partyNames, constituencyNames });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch party and voter data' });
    }
});



router.post('/creatuser', [
    body('name').isLength({ min: 5 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('cnic').isLength({ min: 13, max: 15 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    try {
        await Voter.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            cnic: req.body.cnic,
            isCandidate: req.body.isCandidate,
            constituency: req.body.constituency
        });

        res.json({ success: true });
        console.log('ok');
    } catch (error) {
        console.log(error);
        res.json({ success: false });
        console.log('not ok');
    }
});

router.post('/loginuser', [
    body("email").isEmail(),
    body("password", "Incorrect password").isLength({ min: 5 })]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        console.log(email);
        try {
            let userdata = await Voter.findOne({ email });
            console.log(userdata);
            if (!userdata) {
                return res.status(400).json({ errors: "User not found" });
            }
            const pwdCompare = await bcrypt.compare(req.body.password, userdata.password);
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Try logging with correct credentials" });

            }
            const data = {
                user: {
                    id: userdata.id,
                }
            }
            console.log(email);
            if (email === 'admin513@gmail.com') {
                const adminToken = jwt.sign(data, adminJwtSecret);
                return res.json({ admin: true, adminToken: adminToken, email: userdata.email });
            }
            const authToken = jwt.sign(data, jwtSecret)
            return res.json({ success: true, authToken: authToken, name: userdata.name, constituency: userdata.constituency, email: userdata.email, cnic: userdata.cnic, id: userdata._id });

        }
        catch (error) {
            console.log(error);
            res.json({ success: false, admin: false });
        }
    })

// Backend route to handle the profile page request
router.get('/profile/:id', async (req, res) => {
    try {
        const voterId = req.params.id;
        // Retrieve the voter data based on the provided ID
        const voter = await Voter.findById(voterId).exec();
        // Send the voter data in the response
        res.json(voter);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving voter profile' });
    }
});


module.exports = router;
