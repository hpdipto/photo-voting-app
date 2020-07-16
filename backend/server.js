const express  = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const redis = require('redis');
// const MongoDBStore = require('connect-mongodb-session')(session);

const expressLayouts = require('express-ejs-layouts');


require('dotenv').config();


// Passport config
require('./config/passport.config')(passport);


// App setup
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({credentials: true, origin: "http://localhost:3000"}));
app.use(express.json());


// DB config
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true })
        .then(() => console.log("MongoDB Connected Successfully!"))
        .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.urlencoded({ extended:true }));



// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log("MongoDB Connected Successfully!");
// })


// var store = new MongoDBStore(
//             {
//                 uri: 'mongodb+srv://me:me97@photovotingappv1.9rjdl.mongodb.net/',
//                 databaseName: 'connect_mongodb_session',
//                 collection: 'mySession'
//             }, (err) => {console.log(err)})
// Express session
app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: true,
    // store: new MongoStore({ mongoConnection: connection }),
    cookie: { secure: true }
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