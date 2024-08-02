const Product = require("../../models/Product");

const HandleSearchQueryController = async (req, res) => {
    try {
        const { page = 1, limit = 10, query } = req.query;

        if (!query) {
            return res.status(400).json({ msg: 'Search query is required' });
        }

        // Create a case-insensitive regex pattern for the search query
        const searchPattern = new RegExp(query, 'i');

        const products = await Product.find({ name: { $regex: searchPattern } })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalProducts = await Product.countDocuments({ name: { $regex: searchPattern } });

        return res.status(200).json({
            products,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: parseInt(page)
        });
    } catch (err) {
        console.log("err is => ", err);
        return res.status(500).send('Server error');
    }
};

module.exports = { HandleSearchQueryController };
