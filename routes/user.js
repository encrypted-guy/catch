const express = require('express');
const router = express.Router();
const passport = require('passport');
const chalk = require('chalk');
const ERROR = chalk.bgRed.black;
const SUCCESS = chalk.bgGreen.black;
const INFO = chalk.bgBlue.black;
//model
const User = require('../model/User');

// @desc    user profile page
// @route   GET /user/:id
// @access  Public 
router.get('/user/:id', async (req, res, next) => {
    try {
        const userinfo = await User.findById(req.params.id).populate('products');
        
        // < ------------ REMOVE THIS COMMENTS
        // const products = await Product.find({ seller: userinfo._id});
        // console.log(products);
        // console.log(userinfo.products);

        let userrolehtml = `<span class="seller-in-user">${userinfo.role}</span>`
        res.render('user', {
            userinfo,
            userrolehtml,
            userid: userinfo._id,
            userrole: userinfo.role
        });
        
    } catch (error) {
        console.log(ERROR(next(`USER PAGE ${error}`)));
    }   
});


module.exports = router;