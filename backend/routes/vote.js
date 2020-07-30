const router = require('express').Router();
const mongoose = require('mongoose');
let Poll = require('../models/poll.model');
let User = require('../models/user.model');


// enter into a poll
router.post('/enter', (req, res) => {

    let {pollId, pollPasscode} = req.body;

    const votedPolls = req.user.votedPolls;
    
    // enter into the Poll
    Poll.findOne({pollId: pollId}, (err, poll) => {
        // if any error occurs
        if(err) {
            res.json({'message': err});
        }
        else if(poll) {
            // check if User already voted in this poll or not
            let found = votedPolls.find(elm => elm == poll.id);
            if(found) {
                res.json({'message': "Already voted in this poll"});
            }
            // if User not voted and pollPasscode match
            else if(poll.pollPasscode == pollPasscode) {
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
    });
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


// save vote into the poll
router.post('/poll/:id', (req, res) => {

    const votes = req.body;

    Poll.findById(req.params.id, (err, poll) => {
        if(err) {
            res.status(400).send('Error: ' + err);
        }
        else {
            var imageList = [...poll.imageList];
            for(var i = 0; i < imageList.length; i++) {
                if(votes[i]) { 
                    imageList[i].votes.push(votes[i]);
                }
            }

            // update the poll and User's votedPoll field
            Poll.findByIdAndUpdate(req.params.id, {"imageList": imageList}, (err, poll) => {
                if(err) {
                    res.status(400).send('Error: ' + err);
                }
                else {
                    User.findByIdAndUpdate(req.user.id, 
                                            {$push: {"votedPolls": req.params.id}},
                                            {new: true},
                                            (err, user) => {
                                                if(err) {
                                                    res.status(400).send('Error: ' + err);
                                                }
                                                else {
                                                    res.send('Voted successfully!');
                                                }
                                            })
                }
            });

            // update user poll
        }
    });
});


module.exports = router;