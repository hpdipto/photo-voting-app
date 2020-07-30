const router = require('express').Router();
const mongoose = require('mongoose');
let Poll = require('../models/poll.model');
let User = require('../models/user.model');


// enter into a poll
router.post('/enter', (req, res) => {

    let {pollId, pollPasscode} = req.body;

    Poll.findOne({pollId: pollId}, (err, poll) => {
        // if any error occurs
        if(err) {
            res.json({'message': err});
        }
        else if(poll) {
            // pollPasscode match
            if(poll.pollPasscode == pollPasscode) {
                res.json(poll);
            }
            // poll found but pollPasscode dosen't match
            else {
                res.json({'message': "Poll Passcode doesn't match"});
            }
        }
        // if no poll found
        else {
            res.json({'message': 'No poll found with given ID'});
        }
    })
});


// information about a poll
router.get('/poll/:id', (req, res) => {

    Poll.findById(req.params.id, (err, poll) => {
        if(err) {
            res.status(400).send('Error: ' + err);
        }
        else {
            res.json(poll);
        }
    });
});


module.exports = router;