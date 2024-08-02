const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Order schema
const OrderSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    address: {
        type: String,
        required: true
    },
    transaction_id: {
        type: String,
        default: null
    },
    order_description: [{
        product_id: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        qty: {
            type: Number,
            required: true
        },
        size: {
            type: String,
            required: true
        }
    }],
    order_status: {
        type: String,
        enum: ['pending', 'canceled', 'completed'],
        default: 'pending',
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
OrderSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

module.exports = mongoose.model('Order', OrderSchema);
