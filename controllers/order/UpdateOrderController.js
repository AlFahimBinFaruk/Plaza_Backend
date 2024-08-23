const Order = require('../../models/Order');

const UpdateOrderController = async (req, res) => {
    try {
        const order_id = req.params.order_id;
        const { address, transaction_id, order_description, order_status } = req.body;
        const user_id = req.user.id;

        // Find the order by ID
        const order = await Order.findById(order_id);

        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        // Check if the user is the one who placed the order or an admin
        if (order.user_id.toString() !== user_id && req.user.role !== 'admin') {
            return res.status(403).json({ msg: 'Unauthorized access' });
        }

        // Update allowed fields
        if (address) order.address = address;
        if (transaction_id) order.transaction_id = transaction_id;
        if (order_description) order.order_description = order_description;

        // Allow only admin to update the order status
        if (req.user.role === 'admin' && order_status) {
            order.order_status = order_status;
        }

        order.updated_at = Date.now();

        await order.save();

        return res.status(200).json(order);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
};

module.exports = { UpdateOrderController };