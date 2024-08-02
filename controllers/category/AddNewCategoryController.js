const Category = require("../../models/Category");

const AddNewCategoryController = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Validate request
        if (!name) {
            return res.status(400).json({ msg: 'Name is required' });
        }

        // Check if the category already exists
        let category = await Category.findOne({ name });
        if (category) {
            return res.status(400).json({ msg: 'Category already exists' });
        }

        // Create a new category
        category = new Category({
            name,
            description
        });

        await category.save();

        return res.status(201).json(category);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
};


module.exports={AddNewCategoryController};