const express =  require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => console.error("Connection failed:", err));

