const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Contact GET route working!");
});

router.post("/", (req, res) => {
    const { name, message} = req.body;
    res.status(201).json({
        success: true,
        data: {
            name,
            message,
        },
    });
});
module.exports = router;