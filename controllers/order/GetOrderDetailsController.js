const Order = require('../../models/Order');

const GetOrderDetailsController = async (req, res) => {
    try {
        const order_id = req.params.order_id;

        // Check if the user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ msg: 'Unauthorized access' });
        }

        // Find the order by ID
        const order = await Order.findById(order_id).populate('user_id', 'first_name last_name email');

        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        return res.status(200).json(order);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
};

module.exports = { GetOrderDetailsController };