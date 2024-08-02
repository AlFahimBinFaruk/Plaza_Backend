const Product = require("../../models/Product");

const GetAllProductListController = async (req, res) => {
    try {
        const { page = 1, limit = 10, categoryIds } = req.query;

        const query = {};

        if (categoryIds) {
            // Convert categoryIds to an array of ObjectIds
            const categoryArray = categoryIds.split(',').map(id => mongoose.Types.ObjectId(id));
            query.category_id = { $in: categoryArray };
        }

        const products = await Product.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalProducts = await Product.countDocuments(query);

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

module.exports = { GetAllProductListController };
