const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    },
    phone: {
        type: String,
        maxlength: 20
    },
    address: {
        type: String,
        required: true
    },
    zipcode: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['customer', 'seller'],
        default: 'customer'
    },
    favorite: [],
    // myoder: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'oder'
    // },
    // myrequests: {
    //     type: String
    //     // not decided yet
    // },
    createdAT: {
        type: String
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
// adding date to user
userSchema.pre('save', async function (next) {
    let date_info = new Date;
    let date_into = (date_info.getMonth()+1) + '/' + date_info.getDate() + '/' +  date_info.getFullYear();
    this.createdAT = await date_into;
});

// delete all the blonge Products when user is deleted
userSchema.pre('remove', async function(next) {
    await this.model('product').deleteMany({ seller: this._id })
    next();
});


// reverse populate | vatiruls
userSchema.virtual('products', {
    ref: 'product',
    localField: '_id',
    foreignField: 'seller',
    justOne: false
});


userSchema.virtual('myrequests', {
    ref: 'oder',
    localField: '_id',
    foreignField: '[0].oders[0].oders[0].product.seller',
    justOne: false
});


module.exports = mongoose.model('user', userSchema);