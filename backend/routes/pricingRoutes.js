const express = require('express');
const router = express.Router();

const PricingPlan = require('../models/Plan');

router.get('/', async (req, res) => {
    try {
        const plans = await PricingPlan.find();
        res.json(plans);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

module.exports = router;
