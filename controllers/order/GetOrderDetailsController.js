const Order = require('../../models/Order');

const GetOrderDetailsController = async (req, res) => {
    try {
        const order_id = req.params.order_id;

        // Check if the user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ msg: 'Unauthorized access' });
        }

        // Find the order by ID and ensure it belongs to the authenticated user
        const order = await Order.findOne({ _id: order_id })
            .populate('user_id', 'first_name last_name email')
            .populate('order_description.product_id', 'price');

        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        // Calculate subtotal
        const subtotal = order.order_description.reduce((acc, item) => {
            return acc + (item.product_id.price * item.qty);
        }, 0);

        // Format order details
        const order_details = order.order_description.map(item => ({
            product_id: item.product_id._id,
            qty: item.qty,
            price: item.product_id.price,
            color: item.color,
            size: item.size
        }));

        // Construct the response object
        const response = {
            order_details,
            subtotal,
            user: order.user_id, // Include user details if needed
            address: order.address,
            transaction_id: order.transaction_id,
            order_status: order.order_status,
            created_at: order.created_at,
            updated_at: order.updated_at
        };

        return res.status(200).json(response);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
};

module.exports = { GetOrderDetailsController };