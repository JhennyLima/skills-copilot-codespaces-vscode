// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;  // Port number

// Middleware
app.use(bodyParser.json());

// Mock database
let comments = [];

// Rota para listar todos os comentários
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Rota para adicionar um novo comentário
app.post('/comments', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Texto do comentário é obrigatório.' });
  }
  const newComment = { id: comments.length + 1, text };
  comments.push(newComment);
  res.status(201).json(newComment);
});

// Rota para deletar um comentário pelo ID
app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  const commentIndex = comments.findIndex(comment => comment.id === parseInt(id));
  if (commentIndex === -1) {
    return res.status(404).json({ error: 'Comentário não encontrado.' });
  }
  comments.splice(commentIndex, 1);
  res.status(204).send();
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});