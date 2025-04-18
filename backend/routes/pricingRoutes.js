const express = require('express');
const router = express.Router();

const PricingPlan = require('../models/Plan');

router.get('/', async (_, res) => {
    try {
        const plans = await PricingPlan.find();
        res.json(plans);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

router.put("/:title", async (req, res) => {
    try {
        const decodedTitle = decodeURIComponent(req.params.title);
        const updatedData = req.body;

        console.log("Decoded Title:", decodedTitle);
        console.log("Request Body:", updatedData);

        const updatedCard = await PricingPlan.findOneAndUpdate(
            { title: decodedTitle },
            updatedData,
            { new: true }
        );

        if (!updatedCard) {
            console.log("Card not found for title:", decodedTitle);
            return res.status(404).json({ message: "Card with this title not found" });
        }

        console.log("Updated Card:", updatedCard);
        res.status(200).json(updatedCard);
    } catch (err) {
        console.error("Server error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
