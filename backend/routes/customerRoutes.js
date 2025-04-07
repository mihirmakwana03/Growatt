const express = require("express");
const router = express.Router();
const { addCustomer, getCustomers } = require("../controllers/customerController");
const app = express();
const mongoose = require("mongoose");  // ✅ Add this line
const Customer = require("../models/Customer");


router.post("/", addCustomer); // ✅ POST request at "/"
router.get("/", getCustomers); // ✅ GET request at "/"

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // console.log("Received DELETE request for ID:", id);
        // ✅ Check if ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid customer ID format" });
        }

        const deletedCustomer = await Customer.findByIdAndDelete(id);
        if (!deletedCustomer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        res.json({ message: "✅ Customer deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting customer:", error);
        res.status(500).json({ error: "Failed to delete customer" });
    }
});

module.exports = router;
