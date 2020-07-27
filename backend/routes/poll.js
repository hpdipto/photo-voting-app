const router = require('express').Router();
const multer = require('multer');
const mongoose = require('mongoose');
let Poll = require('../models/poll.model');
let User = require('../models/user.model');

const ObjectId = mongoose.Types.ObjectId;

const upload = multer({dest: './public/img/'});


// https://stackoverflow.com/a/44861809/9481106
router.post('/create', upload.any(), (req, res) => {

    const { pollTitle, pollId, pollPasscode, startDate, endDate, maxVoteLimit } = req.body;
    const createdBy = req.user.id;
    
    var imageList = [];

    for(var i = 0; i < req.files.length; i++) {
        imageList.push(req.files[i].path);
    }

    const newPoll = new Poll({
        createdBy,
        pollTitle,
        pollId,
        pollPasscode,
        maxVoteLimit,
        startDate,
        endDate,
        imageList
    });

    newPoll.save((err, poll) => {
        // source: https://stackoverflow.com/a/23452838/9481106
        // after a poll created successfully
        // we update 'poll' field of corresponding user
        // in future findByIdAndUpdate should be replaced
        if(err) {
            res.status(400).send('Error: ' + err);
        }
        else {
            User.findByIdAndUpdate(createdBy, 
                                {$push: {"polls": poll}},
                                {new: true},
                                (error, user) => {
                                    if(err) {
                                        res.status(400).send('Error: ' + err);
                                    }
                                    else {
                                        res.send('Poll created successfully!');
                                    }
                                });
        }
    })
});




router.get('/:id', (req, res) => {

    Poll.findById(req.params.id, (err, poll) => {
        if(err) {
            res.status(400).send('Error: ' + err);
        }
        else {
            res.json(poll);
        }
    });
});



router.delete('/:id', (req, res) => {
    console.log("Delete request for: ", req.params.id);
    var userPolls = req.user.polls;
    var deleteIndex = userPolls.find(element => element === req.params.id);
    userPolls.splice(deleteIndex, 1);

    User.findByIdAndUpdate(req.user.id, 
                        {'polls': userPolls},
                        {new: true},
                        (err, user) => {
                            // empty callback   
                        });


    Poll.findByIdAndDelete(req.params.id, (err, doc) => {
        if(err) {
            res.status(400).send('Error: ' + err);
        }
        else {
            res.send('Poll deleted successfully!');
        }
    })

});


module.exports = router;