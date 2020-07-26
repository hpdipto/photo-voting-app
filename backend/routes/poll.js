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

    newPoll.save()
            // source: https://stackoverflow.com/a/23452838/9481106
            // after a poll created successfully
            // we update 'poll' field of corresponding user
            // in future findByIdAndUpdate should be replaced
            .then((poll) => {
                User.findByIdAndUpdate(createdBy, 
                            {$push: {"polls": poll}},
                            {new: true},
                            (error, user) => res.send('Poll created successfully!'));
            })
            .catch(err => res.status(400).send('Error: ' + err));
});




router.get('/:id', (req, res) => {

    Poll.findById(req.params.id)
        .then(poll => {
            res.json(poll);
        })
        .catch(err => res.status(400).send('Error: ' + err));
})


module.exports = router;