const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Isse frontend aur backend bina kisi error ke connect ho payenge
app.use(express.json()); // JSON data read karne ke liye

// Ye hamara temporary database hai (Array of Objects)
let flashcards = [
    { id: 1, question: "Node.js kya hai?", answer: "Node.js ek JavaScript runtime hai jo server par code chalata hai." },
    { id: 2, question: "Express.js kya hai?", answer: "Ye Node.js ka ek framework hai jo API banane mein madad karta hai." },
    { id: 3, question: "React kya hai?", answer: "React ek frontend library hai user interface banane ke liye." }
];

// 1. API - Saare Flashcards dekhne ke liye
app.get('/api/cards', (req, res) => {
    res.json(flashcards);
});

// 2. API - Naya Flashcard add karne ke liye (Postman ya Frontend se)
app.post('/api/cards', (req, res) => {
    const newCard = {
        id: Date.now(),
        question: req.body.question,
        answer: req.body.answer
    };
    flashcards.push(newCard);
    res.status(201).json(newCard);
});
// 3. API - Flashcard delete karne ke liye
app.delete('/api/cards/:id', (req, res) => {
    const id = parseInt(req.params.id);
    flashcards = flashcards.filter(card => card.id !== id);
    res.json({ message: "Card delete ho gaya!" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server chalu ho gaya: http://localhost:${PORT}`));