const Order = require('../../models/Order');

const GetMyOrderListController = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const user_id = req.user.id;

        const orders = await Order.find({ user_id: user_id })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalOrders = await Order.countDocuments({ user_id: user_id });

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

module.exports = { GetMyOrderListController };