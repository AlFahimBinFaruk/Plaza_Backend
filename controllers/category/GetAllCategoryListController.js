const Category = require("../../models/Category");

const GetAllCategoryListController = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const categories = await Category.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalCategories = await Category.countDocuments();

        return res.status(200).json({
            categories,
            totalPages: Math.ceil(totalCategories / limit),
            currentPage: parseInt(page)
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
};


module.exports = { GetAllCategoryListController };