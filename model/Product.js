const mongoose = require('mongoose');
const slugify = require('slugify');
const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    slug: String,
    description: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String
    },
    gallery: [],
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Clothes',
            'Luxury',
            'Food',
            'Toys'
        ]
    },
    seller: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    Time: {
        type: String,
    }
});

// create product slug from the title
ProductSchema.pre('save', function(next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});


module.exports = mongoose.model('product', ProductSchema);