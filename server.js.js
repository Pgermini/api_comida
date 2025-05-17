const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

// Configuração para EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para permitir requisições JSON
app.use(express.json());

// Rota inicial
app.get('/', (req, res) => {
    res.render('index', { title: 'API de Comidas', message: 'Bem-vindo à API de comidas de 6 países!' });
});

// Leitura do arquivo JSON com as comidas
const dataPath = path.join(__dirname, 'foods.json');
let foods = [];

try {
    const rawData = fs.readFileSync(dataPath);
    foods = JSON.parse(rawData);
} catch (err) {
    console.error("Erro ao ler foods.json:", err);
}

// Rota para listar todas as comidas
app.get('/foods', (req, res) => {
    res.json(foods);
});

// Rota para buscar comida por ID
app.get('/foods/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const food = foods.find(f => f.id === id);
    if (food) {
        res.json(food);
    } else {
        res.status(404).json({ error: 'Comida não encontrada' });
    }
});

// Rota para buscar comida por nome
app.get('/foods/search', (req, res) => {
    const name = req.query.name?.toLowerCase();
    if (!name) return res.status(400).json({ error: 'Parâmetro "name" é obrigatório' });
    const results = foods.filter(f => f.name.toLowerCase().includes(name));
    res.json(results);
});

// Inicializar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});