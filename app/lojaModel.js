const mongoose = require('mongoose');
const validator = require('validator');

const lojaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isLength(value, { min: 1, max: 100 }),
      message: 'O nome deve ter entre 1 e 100 caracteres'
    }
  },
  responsavel: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isLength(value, { min: 1, max: 100 }),
      message: 'O responsável deve ter entre 1 e 100 caracteres'
    }
    },
    endereco: {
    type: String,
    required: true,
    validate: {
    validator: (value) => validator.isLength(value, { min: 1, max: 200 }),
    message: 'O endereço deve ter entre 1 e 200 caracteres'
    }
    },
    telefone: {
    type: String,
    required: true,
    validate: {
    validator: (value) => validator.isLength(value, { min: 1, max: 20 }),
    message: 'O telefone deve ter entre 1 e 20 caracteres'
    }
    }
    });
    
    const Loja = mongoose.model('Loja', lojaSchema);
    
    module.exports = Loja;