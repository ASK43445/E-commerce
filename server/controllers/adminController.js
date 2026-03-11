const Admin = require('../models/adminModel');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');

const getAdminConfig = async (req, res) => {
    try {
        let config = await Admin.findOne();
        if (!config) {
            config = await Admin.create({ banner: '', categories: [] });
        }
        res.json(config);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateAdminConfig = async (req, res) => {
    try {
        const { banner, categories } = req.body;

        let config = await Admin.findOne();
        if (!config) {
            config = new Admin();
        }

        if (banner !== undefined) config.banner = banner;
        if (categories !== undefined) config.categories = categories;

        const updated = await config.save();
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAdminOverview = async (req, res) => {
    try {
        const [usersCount, productsCount, ordersCount, latestOrders] = await Promise.all([
            User.countDocuments(),
            Product.countDocuments(),
            Order.countDocuments(),
            Order.find().sort({ createdAt: -1 }).limit(5).populate('user', 'username email'),
        ]);

        res.json({
            usersCount,
            productsCount,
            ordersCount,
            latestOrders,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAdminConfig,
    updateAdminConfig,
    getAdminOverview,
};

