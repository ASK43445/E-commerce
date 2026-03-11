const Cart = require('../models/cartModel');

const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('cartItems.product');
        if (!cart) {
            return res.json({ user: req.user._id, cartItems: [] });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addToCart = async (req, res) => {
    try {
        const { productId, qty = 1, size } = req.body;

        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = new Cart({
                user: req.user._id,
                cartItems: [{ product: productId, qty, size }],
            });
        } else {
            const existingItem = cart.cartItems.find(
                (item) =>
                    item.product.toString() === productId &&
                    (size ? item.size === size : true),
            );

            if (existingItem) {
                existingItem.qty += qty;
            } else {
                cart.cartItems.push({ product: productId, qty, size });
            }
        }

        const updatedCart = await cart.save();
        await updatedCart.populate('cartItems.product');
        res.status(201).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCartItem = async (req, res) => {
    try {
        const { itemId, qty } = req.body;

        if (!itemId || qty == null) {
            return res.status(400).json({ message: 'Item ID and quantity are required' });
        }

        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const item = cart.cartItems.id(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        item.qty = qty;
        const updatedCart = await cart.save();
        await updatedCart.populate('cartItems.product');
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeCartItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.cartItems = cart.cartItems.filter((item) => item._id.toString() !== itemId);
        const updatedCart = await cart.save();
        await updatedCart.populate('cartItems.product');
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.cartItems = [];
        const updatedCart = await cart.save();
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
};

