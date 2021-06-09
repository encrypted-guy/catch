const express = require('express');
const router = express.Router();
const passport = require('passport');
const chalk = require('chalk');
const ERROR = chalk.bgRed.black;
const SUCCESS = chalk.bgGreen.black;
const INFO = chalk.bgBlue.black;
//model
const User = require('../model/User');

// check if user is logged in | if user is then cant go to LOGIN oage
function notAuthenticated(req, res, next){
    if(!req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/');
        console.log(SUCCESS('you are aleready logged in '));
    }
}
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/sign-in');
        console.log(ERROR('you are not logged in to do this'));
    }
}


// @desc    login page
// @route   GET /sign-in
// @access  Public (but NOT if login)
router.get('/sign-in', notAuthenticated, async (req, res, next) => {
    try {
        res.render('login');
    } catch (error) {
        console.log(ERROR(next(`LOGIN: ${error}`)));
    }
});


// @desc    lohin page
// @route   POST /sign-in
// @access  Public (but NOT if login)
router.post('/sign-in', notAuthenticated, (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/sign-in',
        failureFlash: true
    })(req, res, next);
});

// @desc    LOGOUT
// @route   POST /user/logout
// @access  Public (but NOT if login)
router.get('/user/logout', ensureAuthenticated, (req, res) => {
    req.logOut();
    console.log(SUCCESS(`logged out`));
    res.redirect('/sign-in');
});


// USER delete with belong products
router.get('/user/delete/:id', ensureAuthenticated, async (req, res, next) => {
    const user = await User.findById(req.params.id);
    user.remove();
    
    res.redirect('/');
})


module.exports = router;