const router = require('express').Router();
let Poll = require('../models/poll.model');
const path = require('path');
const multer = require('multer');


const upload = multer({dest: '../public/img/'});
// const upload = multer();


// https://stackoverflow.com/a/44861809/9481106
router.post('/create', upload.any(), (req, res) => {

    const { pollTitle, pollId, pollPasscode, startDate, endDate, maxVoteLimit } = req.body;
    // const createdBy = req.user.id;
    console.log("##############");
    console.log(req.body);
    console.log("**************");
    console.log(req.files);
    console.log("#############");

    // further needed: https://stackoverflow.com/a/31532067/9481106
    // https://expressjs.com/en/resources/middleware/multer.html


    const newPoll = new Poll({
        pollTitle,
        pollId,
        pollPasscode,
        startDate,
        endDate,
        maxVoteLimit,
        // createdBy,
        imageList
    });

    console.log(newPoll);

    newPoll.save()
            .then(() => res.json('Poll Created!'))
            .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;