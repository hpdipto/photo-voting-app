const bcrypt = require('bcrypt');
const router = require('express').Router();
let User = require('../models/user.model');
const passport = require('passport');
const session = require('express-session');

// finally goes with local-storage option :(
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./sessions');
}


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
            localStorage.setItem('userId', user._id);
            res.send(user);
        });
    })(req, res, next);
});


router.get('/dashboard', (req, res) => {
    var userId = localStorage.getItem('userId');
    if(userId) {
        User.findById(userId, (err, user) => {
            res.json(user);
        })
    }
})


// Handle Lot Out
router.route('/logout').get((req, res) => {
    localStorage.setItem('userId', '');
    res.send('logged out');
})


module.exports = router;