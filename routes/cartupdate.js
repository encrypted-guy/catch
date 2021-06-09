const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const ERROR = chalk.bgRed.black;
const SUCCESS = chalk.bgGreen.black;
const INFO = chalk.bgBlue.black;
//model
const Product = require('../model/Product');
const Oder = require('../model/Oder');

// @desc    add to cart
// @route   GET /cart
// @access  Public 
router.get('/cart', async (req, res, next) => {
    try {
        const cart = req.session.cart;
        res.render('cart', {
            cart: cart
        });
        //ssconsole.log(cart);




    } catch (error) {
        console.log(ERROR(`CART: ${error}`));
    }
});


// @desc    Submit the cart
// @route   POST /cart/submit
// @access  PRIVATE 
router.post('/cart/submit', async (req, res, next) => {
    try {

        // req body
        let total = req.body;

        // buyer id
        const buyer = req.user.id;

        // cart calc funcliaty  
        let oderd = [];
        
        let cart = req.session.cart;
        cart.forEach(item => {
            oderd.push({
                Quantity: item.qty,
                product: item.productID
            });
        });


        // saving it into the oder
        const odered = await Oder.create({
            oders: oderd,
            total: total,
            buyerID: buyer
        });
        console.log(SUCCESS(`Oder success`));
        
        // delete the cart value after submit
        delete req.session.cart;
        
        // redirect to home
        res.redirect(`/user/oders/${req.user.id}`);


    } catch (error) {
        console.log(ERROR(`CART POST: ${error}`));
    }
});


module.exports = router;