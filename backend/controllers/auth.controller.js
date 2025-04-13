const { Admin } = require("../models/admin.model.js");
const bcrypt = require("bcryptjs");
const errorHandler = require("../utils/error.js");

const signup = async (req, res, next) => {
    // console.log(req.body);
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newAdmin = new Admin({ username, email, password: hashedPassword });
    try {
        await newAdmin.save();
        res.status(201).json("Admin create succesfully");        
    } catch (error) {
        next(error);
        // next(errorHandler(550, "Error from the function ", error.message));
    }

};

module.exports = { signup };