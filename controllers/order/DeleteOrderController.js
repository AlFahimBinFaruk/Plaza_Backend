const Order = require('../../models/Order');

const DeleteOrderController = async (req, res) => {
    try {
        const order_id = req.params.order_id;
        const userId = req.user.id;

        // Find the order by ID
        const order = await Order.findById(order_id);

        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        // Check if the user is the one who placed the order or an admin
        if (order.user_id.toString() !== userId && req.user.role !== 'admin') {
            return res.status(403).json({ msg: 'Unauthorized access' });
        }

       

        // Allow user or admin to delete the order
        await order.remove();

        return res.status(200).json({ msg: 'Order removed' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
};

module.exports = { DeleteOrderController };