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

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, next) => {
        crypto.randomBytes(16, (error, namewithin) => {
            if(error){
                console.log(ERROR(`crypto cant rename the file | ${error}`));
                return(error);
            }else{
                const filename = file.fieldname+'-'+namewithin.toString('hex') + path.extname(file.originalname);
                next (null, filename);
            }
        });
    }
});
const upload = multer({
    storage: storage
});

// auth
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/sign-in');
        console.log(ERROR('you are not logged in to do this'));
    }
}

// @desc    add product
// @route   GET /add/product
// @access  Private
router.get('/add/product', ensureAuthenticated, async (req, res, next) => {
    try {
        res.render('addproduct');
        
    } catch (error) {
        console.log(ERROR(`ADD_PRODUCT: ${error}`));
    }
});


// @desc    add product
// @route   POST /add/product
// @access  Private
router.post('/add/product', upload.any(),  async (req, res, next) => {
    try {
        // init gallery array
        let gallery = [];

        // looping through the files and pushing it into the gallery
        req.files.forEach(element => {
            gallery.push(`/public/uploads/${element.filename}`);
        });

        // takae the first PHOTO from the files as thumbnail
        let thumbnail = `/public/uploads/${req.files[0].filename}`;

        // DATE| 
        let date_info = new Date;
        let date_into = (date_info.getMonth()+1) + '/' + date_info.getDate() + '/' +  date_info.getFullYear();

        // GETTING seller
        const seller = req.user._id;
        

        // createing the product inserting INTO database
        const product = await Product.create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            Time: date_into,
            gallery: gallery,
            thumbnail: thumbnail,
            seller: seller
        });
        console.log(SUCCESS(`Product created: | ${product}`));

        res.redirect('back');

        

    } catch (error) {
        console.log(ERROR(`ADD_PRODUCT: ${error}`));
        // return next(ERROR(error));
    }
});




module.exports = router;