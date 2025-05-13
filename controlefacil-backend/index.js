const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

// ─── Middlewares ────────────────────────────
app.use(cors());
app.use(express.json());              // <- importante para ler req.body

// ─── Conexão com o Mongo ───────────────────
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('🟢 Conectado ao MongoDB'))
  .catch(err => console.error('🔴 Erro ao conectar:', err.message));

// ─── Rotas ───────────────────────────────────
const transactionsRoutes = require('./routes/transactions');
app.use('/transactions', transactionsRoutes);  // monta GET e POST em /transactions

// ─── Inicia o servidor ───────────────────────
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
