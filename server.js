const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;

// Configura EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.json());

// Página inicial com bandeiras dos países
app.get('/', (req, res) => {
  const data = fs.readFileSync('./countries.json');
  const countries = JSON.parse(data);
  res.render('index', { countries });
});


// Página de comidas por país
app.get('/pais/:country', (req, res) => {
  const data = fs.readFileSync('./foods.json');
  const foods = JSON.parse(data);
  const country = req.params.country;
  const filteredFoods = foods.filter(f => f.country === country);
  res.render('foods', { country, foods: filteredFoods });
});

// API JSON
app.get('/foods', (req, res) => {
  const data = fs.readFileSync('./foods.json');
  const foods = JSON.parse(data);
  res.json(foods);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
