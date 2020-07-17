const bcrypt = require('bcrypt');
const router = require('express').Router();
let User = require('../models/user.model');
const passport = require('passport');
const session = require('express-session');


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



// Handle Log In
// Saves the day, AlHamdulillah:
// https://stackoverflow.com/questions/49529959/using-react-to-render-flash-messages-from-express
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (e, user, info) => {
        if(e) return next(e);
        if(info) return res.send(info);
        req.logIn(user, e => {
            if(e) return next(e);
            res.send(user);
        });
    })(req, res, next);
});


// Dashboard for Logged in User
router.get('/dashboard', (req, res) => {
    var userId = req.session.passport.user;
    if(userId) {
        User.findById(userId, (err, user) => {
            res.json(user);
        })
    }
    else {
        res.json({"message": "Unauthorized"});
    }
})


// Handle Lot Out
router.route('/logout').get((req, res) => {
    req.logOut();
    req.session.destroy();
    res.send('logged out');
})


module.exports = router;