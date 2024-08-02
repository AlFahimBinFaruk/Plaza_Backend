const Category = require("../../models/Category");

const UpdateCategoryController = async (req, res) => {
    try {
        const category_id = req.params.category_id;
        const { name, description } = req.body;

        // Validate request
        if (!name) {
            return res.status(400).json({ msg: 'Name is required' });
        }

        // Check if the category exists
        let category = await Category.findById(category_id);
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }

        // Update the category
        category.name = name;
        category.description = description || category.description;
        category.updated_at = Date.now();

        await category.save();

        return res.status(200).json(category);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
};

module.exports = { UpdateCategoryController };
