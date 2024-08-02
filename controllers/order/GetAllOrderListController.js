const Order = require('../../models/Order');

const GetAllOrderListController = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        // Check if the user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ msg: 'Unauthorized access' });
        }

        const orders = await Order.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .populate('user_id', 'first_name last_name email');

        const totalOrders = await Order.countDocuments();

        return res.status(200).json({
            orders,
            totalPages: Math.ceil(totalOrders / limit),
            currentPage: parseInt(page)
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
};

module.exports = { GetAllOrderListController };