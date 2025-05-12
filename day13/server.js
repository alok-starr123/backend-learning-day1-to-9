const express = require('express');
const app = express();

app.use(express.json());

const PORT = 5000;

app.get('/', (req, res) => {
    res.send('Hello from Alok!');
});
app.post('/contact', (req, res) => {
    const { name, message } = req.body;
    res.status(200).json({ success: true, name, message });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});