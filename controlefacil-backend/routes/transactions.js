const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// GET /transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /transactions
router.post('/', async (req, res) => {
    const { type, amount, category, date } = req.body;

    const newTransaction = new Transaction({
        type,
        amount,
        category,
        date,
    });

    try {
        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
