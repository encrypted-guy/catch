const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const ERROR = chalk.bgRed.black;
const SUCCESS = chalk.bgGreen.black;
const INFO = chalk.bgBlue.black;
//model
const Product = require('../model/Product');

// @desc    add to cart
// @route   GET /add/cart/:id
// @access  Public 
router.get('/add/cart/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        let product = await Product.findOne({ _id: id });

        if(typeof req.session.cart == 'undefined'){
            req.session.cart = [];
            req.session.cart.push({
                title: product.title,
                slug: product.slug,
                price: product.price,
                category: product.category,
                thumbnail: product.thumbnail,
                qty: 1,
                productID: product._id
            });
        }else{
            let cart = req.session.cart;
            let newItem = true;

            // chack and | id item is already added then add the amount
            for(let i=0; i < cart.length; i++){
                if(cart[i].productID == id){
                    cart[i].qty++;
                    newItem = false;
                    break;
                }
            }

            // CHeck and | if the item is new add the item
            if(newItem){
                cart.push({
                    title: product.title,
                    slug: product.slug,
                    price: product.price,
                    category: product.category,
                    thumbnail: product.thumbnail,
                    qty: 1,
                    productID: product._id
                })
            }
        }

        console.log(SUCCESS(` PRODUCT ADDED `));
        // console.log(req.session.cart);
        res.redirect('back');
        
    } catch (error) {
        console.log(ERROR(`ADD TO CART FUNCTION: ${error}`));
    }

});

// add and remove and clear
router.get('/cart/update/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let cart = req.session.cart;
        let action = req.query.action;

        for (let i = 0; i < cart.length; i++) { 
            if(cart[i].productID == id){
                switch(action){
                    case "add":
                        cart[i].qty++;
                        break;
                    case "remove":
                        cart[i].qty--;
                        if(cart[i].qty < 1){
                            cart.splice(i, 1);
                        }
                        break;
                    case "clear":
                        cart.splice(i, 1);
                        if(cart.length == 0) {
                            delete req.session.cart;
                        }
                        break;
                    default:
                        console.log('cart update problem');
                        break;
                }
                break;
            }
        }
        console.log(SUCCESS(`cart product update success`));
        res.redirect('back');
    } catch (error) {
        console.log(ERROR(`CART UPDATE: ${error}`))
    }
});
// remove all
router.get('/cart/clear', async (req, res, next) => {
    try {
        delete req.session.cart;
        res.redirect('back');
        console.log(SUCCESS(`all item cleared`));
    } catch (error) {
        console.log(ERROR(next(`ALL ITEM CLEAR: ${error}`)));
    }
});



module.exports = router;