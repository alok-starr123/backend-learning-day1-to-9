const express = require('express');
const mongoose = require('mongoose');
const Message = require('./models/Message');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/day16db')
  .then(() => {
    console.log("MongoDB connected");
  })
.catch((err) => {
    console.error("MongoDB connection error", err);
});

app.get('/messages', async (req, res) => {
    const messages = await Message.find();
    res.status(200).json(messages);
});

app.post('/messages', async (req, res) => {
    const { name, message } = req.body;
    const newMessage = new
    Message({ name, message });
    await newMessage.save();
    res.status(201).json(newMessage);
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});