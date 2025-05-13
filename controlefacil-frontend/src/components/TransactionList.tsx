// src/components/TransactionList.tsx
import { useEffect, useState } from 'react';
import api from '../services/api';

type Transaction = {
  _id: string;
  type: string;
  amount: number;
  category: string;
  date: string;
};

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('/transactions').then((res) => {
      setTransactions(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Transações</h2>
      <ul>
        {transactions.map((t) => (
          <li key={t._id}>
            {t.category} - {t.type} - R$ {t.amount} - {new Date(t.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
