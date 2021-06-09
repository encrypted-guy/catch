const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const ERROR = chalk.bgRed.black;
const SUCCESS = chalk.bgGreen.black;
const INFO = chalk.bgBlue.black;
//model
const Product = require('../model/Product');
const User = require('../model/User');


function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/sign-in');
        console.log(ERROR('you are not logged in to do this'));
    }
}

// @desc    add to favorite
// @route   GET /add/fav/:id
// @access  Private
router.get('/add/fav/:id',ensureAuthenticated, async (req, res, next) => {
    try {
        const fav = await User.updateOne({ _id: req.user.id }, { $push: { favorite: req.params.id} });
        console.log(SUCCESS(`add to favorite: ${fav}`));
        res.redirect('back')
    } catch (error) {
        console.log(ERROR(next(`FAVORITE: ${error}`)));
    }
});

// @desc    add to favorite
// @route   GET /user/myfavorites/:id
// @access  Private
router.get('/user/myfavorites/:id', ensureAuthenticated, async (req, res, next) => {
    try {
        const items = await User.findById(req.params.id);
        const favorites  = await Product.find({'_id': {$in: items.favorite}});
        res.render('favorite', {
            favorites,
            userid: req.params.id
        });
    } catch (error) {
        console.log(ERROR(next(`MYFAVORITE: ${error}`)))
    }
}); 



module.exports = router;