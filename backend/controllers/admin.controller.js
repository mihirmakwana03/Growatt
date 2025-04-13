const check = (req, res) => {
        res.json({
            message: "Admin is logged in",
        });
}

module.exports = {check};