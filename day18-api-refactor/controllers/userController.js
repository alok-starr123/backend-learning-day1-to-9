const User = require('../models/User');

exports.getUser = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

exports.createUser = async (req, res) => {
    const newUser = new User(req.body);
    const saved = await newUser.save();
    res.status(201).json(saved);
};

exports.updateUser = async (req, res) => {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};

exports.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res,json({ message: "User deleted" });
};