const Product = require("../../models/Product");
const Category = require("../../models/Category");

const AddNewProductController = async (req, res) => {
    try {
        const { category_id, name, description, price, product_image_url, color, product_size } = req.body;

        // Validate request
        if (!category_id || !name || !description || !price || !product_image_url || !product_size) {
            return res.status(400).json({ msg: 'Please provide all required fields' });
        }

        // Check if the category exists
        const category = await Category.findById(category_id);
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }

        // Create a new product
        const product = new Product({
            category_id,
            name,
            description,
            price,
            product_image_url,
            color,
            product_size
        });

        await product.save();

        return res.status(201).json(product);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
};

module.exports = { AddNewProductController };