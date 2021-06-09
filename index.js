const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
const app = express();
const session = require('express-session');
const flash = require('express-flash');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const chalk = require('chalk');
const ERROR = chalk.bgRed.black;
const SUCCESS = chalk.bgGreen.black;
const INFO = chalk.bgBlue.black;

//load env files
dotenv.config({ path: './config/config.env' });

//DB
require('./config/db');

// express session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// flash
app.use(flash());


//middleware
app.use('/public',express.static('public')); // public folder
// bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//ejs
app.set('view engine', 'ejs');
app.set('json spaces', 3);
//error link
app.use((req, res, next) => {
    console.log(INFO(` ${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl} `));
    next();
});
//error feild finder
app.use(function (err, req, res, next) {
    console.log('This is the invalid field ->', err.field)
    next(err)
});

// passport middleware
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());



//--------------------------

// global ROUTE
app.get('*', (req, res, next) => {
    res.locals.user = req.user || null;
    res.locals.cart = req.session.cart;
    next();
});

//ROUTES
app.use('/', require('./routes/home')) //home page
app.use('/', require('./routes/single')) //single product
app.use('/', require('./routes/addproduct')) //Add product
app.use('/', require('./routes/cart')) // cart functions
app.use('/', require('./routes/cartupdate')) //update the cart
app.use('/', require('./routes/register')) // Register page
app.use('/', require('./routes/login')) // login page
app.use('/', require('./routes/user')) // user page
app.use('/', require('./routes/editproduct')) // EDIT page | EDIT input remove  product
app.use('/', require('./routes/myoders')) // my oders
app.use('/', require('./routes/myrequests')) // my requests
app.use('/', require('./routes/fav')) // favroite
app.use('/', require('./routes/gallery')) // gallery


// secure init
app.use(mongoSanitize()); //senitize
app.use(helmet()); //secure headers
app.use(xss()); //XSS attcak
app.use(hpp()); //preven http parsm polution
const limiter = rateLimit({ //requist rate limit
    windowMs: 10 *60 *1000,
    max: 100
})
app.use(limiter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(SUCCESS(` server running on port ${PORT} `));
});