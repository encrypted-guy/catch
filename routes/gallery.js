const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const ERROR = chalk.bgRed.black;
const SUCCESS = chalk.bgGreen.black;
const INFO = chalk.bgBlue.black;
//model
const Product = require('../model/Product');
// @desc    add to favorite
// @route   GET /gallery
// @access  public
router.get('/gallery', async (req, res, next) => {
    try {
        let photos = []
        const gallery = await Product.find();
        gallery.forEach(element => {
            photos.push(element.gallery)
        }); 
        
        res.render('gallery', {
            photos
        })
    } catch (error) {
        console.log(ERROR(next(`GALLERY: ${error}`)));
    }
})

module.exports = router;