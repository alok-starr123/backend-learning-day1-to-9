const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/studentdb')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const studentSchema = new
mongoose.Schema({
    name: String,
    age: Number,
    course: String,
});
const Student = mongoose.model('Student', studentSchema);

app.post('/students', async (req, res) => {
    const { name, age, course } = req.body;
    const student = new Student({ name, age, course });
    const saved = await student.save();
    res.status(201).json(saved);
});

app.get('/students', async (req, res) => {
    const students = await Student.find();
    res.status(200).json(students);
});

app.put('/students/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age, course } = req.body;
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            { name, age, course },
            { new: true }
        );
        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not Found" });
        }

        res.status(200).json(updatedStudent);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.delete('/students/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ message: "Student deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});