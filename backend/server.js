const express  = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const Grid = require('gridfs-stream');


require('dotenv').config();


// Passport config
require('./config/passport.config')(passport);


// App setup
const app = express();
const port = process.env.PORT || 5000;


// Cors setup
app.use(cors({
    origin:['http://localhost:3000'],
    methods:['GET','POST'],
    credentials: true // enable set cookie
}));
app.use(express.json());



// DB config
// For deployment
// Also change uri in routes/poll.js
// const uri = process.env.ATLAS_URI;

// For local development
const uri = 'mongodb://localhost/photo_voting_app';
mongoose.connect(uri, { useNewUrlParser: true })
        .then(() => console.log("MongoDB Connected Successfully!"))
        .catch(err => console.log(err));


// Init GFS
let gfs;
// Mongoose event handler, after connection
// Source: https://stackoverflow.com/a/20360815/9481106
const conn = mongoose.connection;
conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
})


// Express session
app.use(session({
    secret: process.env.KEYBOARD_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: { sameSite: 'strict', secure: false }   // anti-depressant line!!!
}));



// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Connect flash
app.use(flash())



// Routers
const userRoutes = require('./routes/user');
const pollRoutes = require('./routes/poll');
const voteRoutes = require('./routes/vote');

app.use('/api/user', userRoutes);
// Source: https://stackoverflow.com/a/30234851/9481106
app.use('/api/poll', (req, res, next) => {req.gfs = gfs; next();}, pollRoutes);
app.use('/api/vote', voteRoutes);


// Default directory for static files
// Uploaded images will inside public/img
// For development
// app.use(express.static('public'));

// For deployment
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



// Server started
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})