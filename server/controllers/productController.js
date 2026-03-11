const mongoose = require('mongoose');
const Product = require('../models/productModel');

const getProducts = async (req, res) => {
    try {
        const keyword = req.query.search
            ? {
                title: {
                    $regex: req.query.search,
                    $options: 'i',
                },
            }
            : {};
        const products = await Product.find({ ...keyword });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const product = await Product.findById(id);
        if (product) {
            return res.json(product);
        }
        res.status(404).json({ message: 'Product not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const product = new Product({ ...req.body });
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getProducts, getProductById, createProduct };
