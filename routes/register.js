const express = require('express');
const router = express.Router();
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


// @desc    REgister page
// @route   GET /sign-up
// @access  Public (but NOT if login)
router.get('/sign-up', notAuthenticated, async (req, res, next) => {
    try {
        res.render('register');
    } catch (error) {
        console.log(ERROR(next(`REGISTER: ${error}`)));
    }
});


// @desc    REgister page
// @route   POST /sign-up
// @access  Public (but NOT if login)
router.post('/sign-up', notAuthenticated, async (req, res, next) => {
    try {
        const email = req.body.email.toLowerCase();
        const password = req.body.password;
        const password2 = req.body.password2;
        const user = await User.findOne({ email: email });
        // check if user exixts
        if(!user){
            // check if passwrod matches
            if(password === password2){
                // checking the passwork match and all
                if(password.length > 8) {
                    const usersaver = await User.create({
                        name: req.body.name,
                        email: email,
                        phone: req.body.phone,
                        address: req.body.address,
                        zipcode: req.body.zipcode,
                        city: req.body.city,
                        role: req.body.role,
                        password: password
                    });
                    console.log(SUCCESS(`user added`));
                    res.redirect('/sign-in');
                }else{
                    console.log(ERROR(`password must be greater then 8 letters`));
                }
            }else{
                console.log(ERROR(`password dosent match`));
            }
        }else{
            console.log(ERROR(`user in already in`));
        }
        
    } catch (error) {
        console.log(ERROR(next(`REGISTER: ${error}`)));
    }
});





module.exports = router;