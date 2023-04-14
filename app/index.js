const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const lojaRoutes = require('./lojaRoutes');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/loja', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/lojas', lojaRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});