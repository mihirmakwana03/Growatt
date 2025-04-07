const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

// Dummy admin credentials (replace with a database in production)
const adminUser = {
    username: "admin",
    password: bcrypt.hashSync("admin123", 10), // Hash the password
};

// ✅ Admin Login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    // Check admin credentials
    if (username === adminUser.username && bcrypt.compareSync(password, adminUser.password)) {
        req.session.admin = { username }; // Store session
        return res.json({ message: "Login successful!" });
    }

    res.status(401).json({ message: "Invalid username or password." });
});

// ✅ Admin Logout
router.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.json({ message: "Logged out successfully!" });
    });
});

// ✅ Check if Admin is Logged In
router.get("/check", (req, res) => {
    if (req.session.admin) {
        res.json({ loggedIn: true, admin: req.session.admin });
    } else {
        res.json({ loggedIn: false });
    }
});

module.exports = router;
