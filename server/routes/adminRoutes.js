const express = require('express');
const router = express.Router();
const {
    getAdminConfig,
    updateAdminConfig,
    getAdminOverview,
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.use(protect, admin);

router.get('/config', getAdminConfig);
router.put('/config', updateAdminConfig);
router.get('/overview', getAdminOverview);

module.exports = router;

