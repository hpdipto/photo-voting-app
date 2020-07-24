const router = require('express').Router();
const multer = require('multer');
let Poll = require('../models/poll.model');


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
            .then(() => res.json('Poll Created!'))
            .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;