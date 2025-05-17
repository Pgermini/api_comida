const express = require('express');
const app = express();
const fs = require('fs');
const PORT = process.env.PORT || 3000;

// Middleware para servir JSON corretamente
app.use(express.json());

// Rota principal que retorna todas as comidas diretamente
app.get('/', (req, res) => {
  const data = fs.readFileSync('./foods.json');
  const foods = JSON.parse(data);
  res.json(foods);
});

// Outras rotas
app.get('/foods', (req, res) => {
  const data = fs.readFileSync('./foods.json');
  const foods = JSON.parse(data);
  res.json(foods);
});

app.get('/foods/:id', (req, res) => {
  const data = fs.readFileSync('./foods.json');
  const foods = JSON.parse(data);
  const food = foods.find(f => f.id == req.params.id);
  if (food) {
    res.json(food);
  } else {
    res.status(404).json({ error: 'Comida não encontrada' });
  }
});

app.get('/foods/search', (req, res) => {
  const name = req.query.name?.toLowerCase();
  const data = fs.readFileSync('./foods.json');
  const foods = JSON.parse(data);
  const results = foods.filter(f => f.name.toLowerCase().includes(name));
  res.json(results);
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
