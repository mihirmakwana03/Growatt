const bcryptjs = require("bcryptjs");
const { Admin } = require("../models/admin.model.js");
const errorHandler = require("../utils/error.js");

const check = (req, res) => {
    res.json({
        message: "Admin is logged in",
    });
}

const updateAdmin = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(403, "You can only update your account!"));
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            }
        }, { new: true });

        const { password, ...others } = updatedAdmin._doc;
        res.status(200).json(others);

    } catch (error) {
        next(error);
    }
}

module.exports = { check, updateAdmin };