const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['entrada', 'saida'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Transaction', transactionSchema);
