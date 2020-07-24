const express  = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser = require('body-parser');


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



// // Body Parser setup
// app.use(bodyParser.urlencoded({
//         extended: false
// }));
// app.use(bodyParser.json());



// DB config
// const uri = process.env.ATLAS_URI;
const uri = 'mongodb://localhost/database';
mongoose.connect(uri, { useNewUrlParser: true })
        .then(() => console.log("MongoDB Connected Successfully!"))
        .catch(err => console.log(err));


// Express session
app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: false,
    cookie: { secure: false }   // anti-depressant line!!!
}));


// Default directory for static files
// Uploaded images will inside public/img
app.use(express.static('public'));


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Connect flash
app.use(flash())



// Routers
const userRoutes = require('./routes/user');
const pollRoutes = require('./routes/poll');

app.use('/user', userRoutes);
app.use('/poll', pollRoutes)



// Server started
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})