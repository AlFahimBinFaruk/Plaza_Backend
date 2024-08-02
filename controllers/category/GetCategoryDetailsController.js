const Category = require("../../models/Category");

const GetCategoryDetailsController = async (req, res) => {
    try {
        const category_id = req.params.category_id;

        // Find the category by ID
        const category = await Category.findById(category_id);
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }

        return res.status(200).json(category);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
};


module.exports={GetCategoryDetailsController};