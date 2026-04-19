const express = require('express');
const cors = require('cors');
const app = express();
// Agar sirf itna likha hai:
app.use(cors()); 

// Toh ise badal kar ye kar dijiye (taaki koi bhi frontend ise use kar sake):
app.use(cors({ origin: '*' }));
``
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

// Ye line kehti hai: "Render ka port use karo, agar wo nahi mile toh 5000 use karo"
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server chalu ho gaya port: ${PORT}`));
const API_URL = 'https://flashcard-lzda.onrender.com/api/cards';
// Poori file mein jahan bhi localhost hai, use Render wale link se badal dein
const API_URL = 'https://flashcard-lzda.onrender.com/api/cards';