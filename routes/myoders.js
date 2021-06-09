const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const ERROR = chalk.bgRed.black;
const SUCCESS = chalk.bgGreen.black;
const INFO = chalk.bgBlue.black;
//model
const Oder = require('../model/Oder');

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/sign-in');
        console.log(ERROR('you are not logged in to do this'));
    }
}

// @desc    My oders page
// @route   GET /user/oders/:id
// @access  private
router.get('/user/oders/:id', ensureAuthenticated, async (req, res, next) => {
    try {
        const oders = await Oder.find({ buyerID: req.params.id }).populate('oders.product').populate('buyerID');
        res.render('myoders', {
            oders
        });
    } catch (error) {
        console.log(ERROR(next(`MYODERS: ${error}`)));
    }
});







module.exports = router;