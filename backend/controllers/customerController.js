const Customer = require("../models/Customer");

// Add customer
const addCustomer = async (req, res) => {
    try {
        const newCustomer = new Customer(req.body);
        await newCustomer.save();
        res.status(201).json({
            message: "Customer data saved successfully!",
            customer: newCustomer,
        });
    } catch (error) {
        console.error("❌ Error saving customer data:", error);
        res.status(500).json({ error: "Error saving data" });
    }
};

// Fetch all customers
const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        console.error("❌ Error fetching customer data:", error);
        res.status(500).json({ error: "Error fetching data" });
    }
};

module.exports = { addCustomer, getCustomers };
