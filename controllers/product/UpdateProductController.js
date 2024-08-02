const Product = require("../../models/Product");
const Category = require("../../models/Category");

const UpdateProductController = async (req, res) => {
    try {
        const product_id = req.params.product_id;
        const { category_id, name, description, price, product_image_url, color, product_size } = req.body;

        // Validate request
        if (!name || !description || !price || !product_image_url || !product_size) {
            return res.status(400).json({ msg: 'Please provide all required fields' });
        }

        // Check if the product exists
        const product = await Product.findById(product_id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        // Check if the category exists if provided
        if (category_id) {
            const category = await Category.findById(category_id);
            if (!category) {
                return res.status(404).json({ msg: 'Category not found' });
            }
        }

        // Update the product
        product.category_id = category_id || product.category_id;
        product.name = name;
        product.description = description;
        product.price = price;
        product.product_image_url = product_image_url;
        product.color = color || product.color;
        product.product_size = product_size;

        product.updated_at = Date.now();

        await product.save();

        return res.status(200).json(product);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
};

module.exports={UpdateProductController};