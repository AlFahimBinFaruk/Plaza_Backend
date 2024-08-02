const Order = require('../../models/Order');

const GetMyOrderDetailsController = async (req, res) => {
    try {
        const order_id = req.params.order_id;
        const user_id = req.user.user_id;

        // Find the order by ID and ensure it belongs to the authenticated user
        const order = await Order.findOne({ _id: order_id, user_id: user_id }).populate('user_id', 'first_name last_name email');

        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        return res.status(200).json(order);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
};

module.exports = { GetMyOrderDetailsController };