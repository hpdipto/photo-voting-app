const express  = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

require('dotenv').config();


// Passport config
require('./config/passport.config')(passport);


// App setup
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// DB config
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB Connected Successfully!");
})

// Body parser
app.use(express.urlencoded({ extended: true }));


// Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash())


// Routers
const userRoute = require('./routes/users');


app.use('/users', userRoute);


// Server started
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})