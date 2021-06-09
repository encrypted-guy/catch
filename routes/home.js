const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const ERROR = chalk.bgRed.black;
const SUCCESS = chalk.bgGreen.black;
const INFO = chalk.bgBlue.black;
//model
const Product = require('../model/Product');

// @desc    home page
// @route   GET /
// @access  Public
router.get('/', async (req, res, next) => {
    try {
        let query;
        const reqQuery = { ...req.query };
        
        const removefeilds  = ['page', 'limit'];
        // loop over and remove from reqQuery
        removefeilds.forEach(param => delete reqQuery[param]);

        let queryString = JSON.stringify(reqQuery);
        query = Product.find(JSON.parse(queryString));


        // pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 12;
        const skip = (page -1) * limit;
        query = query.skip(skip).limit(limit);
        const endindex = page * limit;
        const total = await Product.countDocuments();


        // making query request
        const products = await query;
    
            let paginationNEXT = '';
            let paginationPREV = '';
            let paginationCUTTENT = '';

            // pagination NEXT
            if(endindex < total) {
                paginationNEXT = {
                    page: page + 1,
                    Nextpageurl: `/?page=${page + 1}`
                }
            }
            // pagination PREV
            if(skip > 0) {
                paginationPREV = {
                    page: page -1,
                    Prvpageurl: `/?page=${page - 1}`,
                }
            }
            // getting current page
            paginationCUTTENT = {
                page: page,
                currentpageurl: `/?page=${page}`
            }
        res.render('home', {
            paginationNEXT,
            paginationPREV,
            paginationCUTTENT,
            products
        });
    } catch (error) {
        console.log(ERROR(`HOME: ${error}`));
    }
});


module.exports = router;