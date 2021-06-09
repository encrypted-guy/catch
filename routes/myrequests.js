const express = require('express');
const router = express.Router();
const passport = require('passport');
const chalk = require('chalk');
const ERROR = chalk.bgRed.black;
const SUCCESS = chalk.bgGreen.black;
const INFO = chalk.bgBlue.black;
//model
const Oder = require('../model/Oder')
const Product = require('../model/Product');

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/sign-in');
        console.log(ERROR('you are not logged in to do this'));
    }
}

// @desc    requests
// @route   GET /user/my/requests
// @access  Private 
router.get('/user/my/requests',ensureAuthenticated, async (req, res, next) => {
    try {
        const oders = await Oder.find().populate('oders.product').populate('buyerID');
    

        let revenue = 0;
        let odernumber = 0;

        oders.forEach(element => { // same calculation in the front
            element.oders.forEach(item => {
                // console.log(SUCCESS(item.product.seller));
                if(item.product.seller == req.user.id) {
                    total = item.Quantity *  item.product.price;
                    revenue +=  +total;
                    odernumber += +item.Quantity;

                }
            });
        });
        let profitcal = revenue * 0.03;
        let profit = revenue - profitcal;
       


        res.render('myrequests', {
            alloders: oders,
            revenue,
            odernumber,
            profit
        })
    } catch (error) {
        console.log(ERROR(next(`MYREQUEST: ${error}`)));
    }
});

/*
router.get('/test',  async (req, res, next) => {
    try {
        const oders = await Oder.find().populate('oders.product').populate('buyerID');
    

        let revenue = 0;
        let odernumber = 0;

        oders.forEach(element => { // same calculation in the front
            element.oders.forEach( async item => {
                console.log(INFO(`seller: ${item.product.seller}`));
                console.log(INFO(`user: ${req.user.id}`))
                let changed = item.product.seller.toString();
                if(item.product.seller == req.user.id) {
                    total = item.Quantity *  item.product.price;
                    revenue +=  +total;
                    odernumber += +item.Quantity;

                    console.log(SUCCESS(`seller: ${item.product.seller}`));
                    console.log(SUCCESS(`user: ${req.user.id}`))
                    // console.log(item.product.seller);
                    // console.log(INFO(req.user.id));

                    // console.log(typeof(item.product.seller));
                    // let changed = item.product.seller.toString();
                    // console.log(SUCCESS(typeof(changed)));
                    // console.log(SUCCESS(changed));
                    // console.log(INFO(typeof(req.user.id)));
                    // console.log(INFO(req.user.id));
                }
               
            });
        });
        let profitcal = revenue * 0.03;
        let profit = revenue - profitcal;
       


        res.json({
            alloders: oders,
            revenue,
            odernumber,
            profit
        })
    } catch (error) {
        console.log(ERROR(next(`MYREQUEST: ${error}`)));
    }
});
*/

module.exports = router;