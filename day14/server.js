const express = require("express");
const app = express();
const ContactRoutes = require("./routes/contact");

app.use(express.json());

app.use("/contact", ContactRoutes);

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});