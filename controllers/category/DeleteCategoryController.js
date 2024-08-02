const Category = require("../../models/Category");

const DeleteCategoryController = async (req, res) => {
    try {
        const category_id = req.params.category_id;

        // Check if the category exists
        const category = await Category.findById(category_id);
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }

        // Delete the category
        await Category.findByIdAndDelete(category_id);

        return res.status(200).json({ msg: 'Category deleted successfully' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
};


module.exports = { DeleteCategoryController };