const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Product schema
const ProductSchema = new Schema({
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    product_image_url: {
        type: String,
        required: true
    },
    color: [{
        name: {
            type: String,
            required: true
        },
        qty: {
            type: Number,
            required: true
        }
    }],
    product_size: {
        type: [String],
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

// Update `updated_at` before saving
ProductSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

module.exports = mongoose.model('Product', ProductSchema);
