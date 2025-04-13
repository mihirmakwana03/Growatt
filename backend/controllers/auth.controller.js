const { Admin } = require("../models/admin.model.js");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
    // console.log(req.body);
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newAdmin = new Admin({ username, email, password: hashedPassword });
    try {
        await newAdmin.save();
        res.status(201).json("Admin create succesfully");        
    } catch (error) {
        res.status(500).json(error.message);
    }

};

module.exports = { signup };