const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const ERROR = chalk.bgRed.black;
const SUCCESS = chalk.bgGreen.black;
const INFO = chalk.bgBlue.black;

const Product = require('../model/Product');

// @desc    single product view
// @route   GET /product/:id
// @access  Public
router.get('/product/:slug', async (req, res, next) => {
    try {
        const product = await Product.findOne({slug: req.params.slug}).populate('seller');
        const products = await Product.find({category: product.category});
        // console.log(products)
        res.render('single', {
            product,
            relativecount: products.length,
            products
        });
    } catch (error) {
        console.log(ERROR(`SINGLE: ${error}`));
    }
});

// remove this
router.get('/pro/:slug', async (req, res, next) => {
    try {
        const product = await Product.findOne({slug: req.params.slug}).populate('seller');
        const products = await Product.find({category: product.category});
        //console.log(product)
        res.json({
            success: true,
            count: product.length,
            data: product
        });
    } catch (error) {
        console.log(ERROR(`SINGLE: ${error}`));
    }
});

module.exports = router;
