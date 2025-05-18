const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.json());

// Carrega JSONs
const countries = JSON.parse(fs.readFileSync('./countries.json'));
const foods = JSON.parse(fs.readFileSync('./foods.json'));

// Página inicial: bandeiras dos países
app.get('/', (req, res) => {
  res.render('index', { countries });
});

// Página de comidas por país
app.get('/pais/:nome', (req, res) => {
  const nome = req.params.nome;
  const filteredFoods = foods.filter(f => f.country === nome);
  res.render('foods', { pais: nome, foods: filteredFoods });
});

// API pública com todos os pratos
app.get('/foods', (req, res) => {
  res.json(foods);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
