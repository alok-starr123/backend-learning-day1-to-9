const express = require("express");
const app = express();
const userRoutes = require("./routes/users");

app.use(express.json());
app.use("/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to day15 Modular Express App!");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});