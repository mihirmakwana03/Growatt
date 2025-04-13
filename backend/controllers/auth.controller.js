const { Admin } = require("../models/admin.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const error = require("../utils/error.js");

const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newAdmin = new Admin({ username, email, password: hashedPassword });

    try {
        await newAdmin.save();
        res.status(201).json("Admin created successfully");
    } catch (err) {
        if (err.code === 11000) { // Duplicate key error
            const duplicatedField = Object.keys(err.keyPattern)[0];
            return res.status(400).json({
                error: `${duplicatedField} already exists`
            });
        }
        next(err); // Pass other errors to the error handler
    }
};


const login = async (req, res, next) => {
    const { username, password } = req.body;
    try {

        const validUser = await Admin.findOne({ username });
        if (!validUser) return next(error(404, "User not found!"));

        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) return next(error(401, "Wrong Credentials!"));

        const token = jwt.sign(
            { id: validUser._id },
            process.env.JWT_SECRET
        );
        
        const { password: pass, ...others } = validUser._doc;

        res.cookie("access_token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
            // secure: process.env.NODE_ENV === "production",
            // sameSite: "strict",
        }).status(200).json(others);

    } catch (error) {
        next(error);
    }
}

module.exports = { signup, login };