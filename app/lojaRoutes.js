const express = require('express');
const router = express.Router();
const Loja = require('./lojaModel');
const axios = require('axios');

router.use(async (req, res, next) => {
  if ((req.method === 'POST' || req.method === 'PUT') && req.body.cep) {
    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${req.body.cep}/json`);
      req.body.endereco = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
    } catch (err) {
      console.error('Erro ao obter endereço a partir do CEP', err);
    }
  }
  next();
});

router.get('/', async (req, res) => {
  const lojas = await Loja.find();
  res.json(lojas);
});

router.post('/', async (req, res) => {
  const { nome, responsavel, endereco, telefone } = req.body;
  if (!nome || !responsavel || !endereco || !telefone) {
    return res.status(400).json({ message: 'Preencha todos os campos obrigatórios' });
  }
  const loja = new Loja({ nome, responsavel, endereco, telefone });
  await loja.save();
  res.json(loja);
});

router.put('/:id', async (req, res) => {
  const { nome, responsavel, endereco, telefone } = req.body;
  if (!nome || !responsavel || !endereco || !telefone) {
    return res.status(400).json({ message: 'Preencha todos os campos obrigatórios' });
  }
  const loja = await Loja.findByIdAndUpdate(req.params.id, { nome, responsavel, endereco, telefone }, { new: true });
  if (!loja) {
    return res.status(404).json({ message: 'Loja não encontrada' });
  }
  res.json(loja);
});

router.delete('/:id', async (req, res) => {
  const loja = await Loja.findByIdAndDelete(req.params.id);
  if (!loja) {
    return res.status(404).json({ message: 'Loja não encontrada' });
  }
  res.json({ message: 'Loja excluída com sucesso' });
});

module.exports = router;