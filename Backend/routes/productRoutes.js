const express = require('express');
const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const { protect } = require('../middleware/authMiddleware'); // Import the protection middleware

const router = express.Router();

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
}));

// @desc    Create a new product
// @route   POST /api/products
// @access  Private (requires authentication)
router.post('/', protect, asyncHandler(async (req, res) => {
    const { name, price, description, category, images } = req.body;

    const product = new Product({
        name,
        price,
        description,
        category,
        images,
        user: req.user._id, // Associate the product with the logged-in user
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
}));

module.exports = router;
