const Order = require('../../models/Order');
const Product = require('../../models/Product');

const PlaceOrderController = async (req, res) => {
    try {
        const { address, order_description } = req.body;
        const user_id = req.user.id;

        // Validate request
        if (!address || !order_description || !order_description.length) {
            return res.status(400).json({ msg: 'Please provide all required fields' });
        }

        // Validate order_description content
        for (let item of order_description) {
            if (!item.product_id || !item.qty || !item.size || !item.color) {
                return res.status(400).json({ msg: 'Invalid order description' });
            }

            // Check if the product exists
            const product = await Product.findById(item.product_id);
            if (!product) {
                return res.status(404).json({ msg: `Product with id ${item.product_id} not found` });
            }
        }

        // Create a new order
        const order = new Order({
            user_id,
            address,
            transaction_id:"",
            order_description,
            order_status: 'pending'
        });

        await order.save();

        return res.status(201).json(order);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
};

module.exports = { PlaceOrderController };