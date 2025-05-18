const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;

// 1. Configurar EJS como view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // pasta onde está o index.ejs

// 2. Servir arquivos estáticos se necessário (ex: CSS, imagens locais)
app.use(express.static(path.join(__dirname, 'public')));

// 3. Rota que renderiza a página com EJS
app.get('/', (req, res) => {
  const data = fs.readFileSync('./foods.json');
  const foods = JSON.parse(data);
  res.render('index', { foods }); // renderiza index.ejs com os dados
});

// 4. Rota que retorna JSON puro
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

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
