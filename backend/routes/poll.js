const router = require('express').Router();
const multer = require('multer');
const mongoose = require('mongoose');
const fs = require('fs');
let Poll = require('../models/poll.model');
let User = require('../models/user.model');

const ObjectId = mongoose.Types.ObjectId;

const upload = multer({dest: './public/img/'});


// get polls of current user
router.get('/', (req, res) => {

    if(req.user) {
        res.json(req.user.polls);
    }
    else {
        res.status(400).send('Error!');
    }
})



// creating a poll
// https://stackoverflow.com/a/44861809/9481106
router.post('/create', upload.any(), (req, res) => {

    const { pollTitle, pollId, pollPasscode, startDate, endDate, maxVoteLimit } = req.body;
    const createdBy = req.user.id;
    
    var imageList = [];

    for(var i = 0; i < req.files.length; i++) {
        // before: imageList.push(req.files[i].path);
        var imageListObject = { 
                                "src": req.files[i].path, 
                                "votes": []
                              };
        imageList.push(imageListObject);
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



// get a particular poll by id
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


// delete a particular poll by id
router.delete('/:id', (req, res) => {

    // delete file from server
    // source: https://flaviocopes.com/how-to-remove-file-node/
    Poll.findById(req.params.id, (err, poll) => {
        if(err) {
            res.status(400).send('Error at file deleting: ' + err);
        }
        else {
            let imageList = poll.imageList;
            for(var i = 0; i < imageList.length; i++) {
                fs.unlinkSync(imageList[i]["src"]);
            }
        }
    });


    // remove Poll entry from database
    Poll.findByIdAndDelete(req.params.id, (err, doc) => {
        if(err) {
            res.status(400).send('Error: ' + err);
        }
        else {
            res.send('Poll deleted successfully!');
        }
    });


    // delete poll from User data
    var userPolls = req.user.polls;
    var deleteIndex = userPolls.findIndex(element => element._id == req.params.id);
    userPolls.splice(deleteIndex, 1);

    User.findByIdAndUpdate(req.user.id, 
                        {'polls': userPolls},
                        {new: true},
                        (err, user) => {
                            // empty callback   
                        });

});


module.exports = router;