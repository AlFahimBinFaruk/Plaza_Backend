const Product = require("../../models/Product");

const DeleteProductController = async (req, res) => {
    try {
        
        const product_id = req.params.product_id;

        // console.log("params => ",req.params.product_id);

        // Check if the product exists
        const product = await Product.findById(product_id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        // Delete the product
        await Product.findByIdAndDelete(product_id);

        res.status(200).json({ msg: 'Product deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


module.exports = { DeleteProductController };