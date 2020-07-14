const bcrypt = require('bcrypt');
const router = require('express').Router();
let User = require('../models/user.model');


router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password, 11);
    // const password = req.body.password;
    
    const newUser = new User({
        name,
        email,
        password
    });

    newUser.save()
            .then(() => res.json('User added!'))
            .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;