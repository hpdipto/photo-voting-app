const bcrypt = require('bcrypt');
const router = require('express').Router();
let User = require('../models/user.model');
const passport = require('passport');


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


// Handle Login
// Saves the day, AlHamdulillah:
// https://stackoverflow.com/questions/49529959/using-react-to-render-flash-messages-from-express
router.route('/login').post((req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) return next(err);
        if(info) return res.send(info);
        req.logIn(user, err => {
            if(err) return next(err);
            return res.send(user);
        });
    })(req, res, next);
});



module.exports = router;