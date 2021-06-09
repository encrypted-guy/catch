const express = require('express');
const router = express.Router();
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const chalk = require('chalk');
const ERROR = chalk.bgRed.black;
const SUCCESS = chalk.bgGreen.black;
const INFO = chalk.bgBlue.black;

//model
const Product = require('../model/Product');


// @desc    add product
// @route   GET /product/edit/:id
// @access  Private
router.get('/product/edit/:id', async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        console.log(product);
        res.render('edit', {
            product: product
        });
        
    } catch (error) {
        console.log(ERROR(`ADD_PRODUCT: ${error}`));
    }
});


// @desc    EDIT product
// @route   POST /edit/product/:id
// @access  Private
router.post('/product/edit/:id',  async (req, res, next) => {
    try {

        const product = await Product.findById(req.params.id);

        await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        console.log(SUCCESS(`Product EDITED`));
        res.redirect(`/user/${req.user.id}`);

    } catch (error) {
        console.log(ERROR(`EDIT_PRODUCT: ${error}`));
        // return next(ERROR(error));
    }
});

// @desc    EDIT product
// @route   POST /edit/product/:id
// @access  Private
router.get('/product/Remove/:id',  async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if(req.user.id == product.seller) {
            product.remove();
            res.redirect(`/user/${req.user.id}`);
        }else{
            console.log(ERROR('cant remove the product'));
        }
    } catch (error) {
        console.log(ERROR(`EDIR_PRODUCT: ${error}`));
        // return next(ERROR(error));
    }
});




module.exports = router;