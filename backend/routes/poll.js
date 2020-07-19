const router = require('express').Router();
let Poll = require('../models/poll.model');


router.post('/create', (req, res) => {

    const { pollTitle, pollId, pollPasscode, startDate, endDate, maxVoteLimit } = req.body;
    const createdBy = req.user.id;

    const newPoll = new Poll({
        pollTitle,
        pollId,
        pollPasscode,
        startDate,
        endDate,
        maxVoteLimit,
        createdBy
    });

    newPoll.save()
            .then(() => res.json('Poll Created!'))
            .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;