const Product = require("../../models/Product");

const GetProductDetailsController = async (req, res) => {
    try {
        const product_id = req.params.product_id;

        // Find the Product by ID
        const product = await Product.findById(product_id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        return res.status(200).json(product);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
};


module.exports={GetProductDetailsController};