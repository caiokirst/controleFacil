import { useEffect, useState, type FormEvent } from 'react';
import axios from 'axios';
import { PlusCircle, List, Calendar } from 'lucide-react';
import './TransactionsScreen.css';

interface Transaction {
  _id: string;
  type: 'entrada' | 'saida';
  amount: number;
  category: string;
  date: string;
}

export default function TransactionsScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [type, setType] = useState<'entrada' | 'saida'>('entrada');
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const { data } = await axios.get<Transaction[]>('http://localhost:5000/transactions');
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/transactions', { type, amount, category, date });
      fetchTransactions();
      setType('entrada');
      setAmount(0);
      setCategory('');
      setDate(new Date().toISOString().split('T')[0]);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <div className="tf-container">
      <header className="tf-header">
        <h1>ControleFácil</h1>
        <p>Seu painel financeiro em um só lugar</p>
      </header>

      <section className="tf-card">
        <div className="tf-section-title">
          <PlusCircle className="tf-icon" /> Nova Transação
        </div>
        <form onSubmit={handleSubmit} className="tf-form">
          <div className="tf-form-group">
            <label>Tipo</label>
            <select value={type} onChange={e => setType(e.target.value as any)}>
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>
          </div>
          <div className="tf-form-group">
            <label>Valor (R$)</label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              required
            />
          </div>
          <div className="tf-form-group">
            <label>Categoria</label>
            <input
              type="text"
              value={category}
              onChange={e => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="tf-form-group">
            <label>Data</label>
            <div className="tf-date-input">
              <Calendar className="tf-icon-small" />
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="tf-form-submit">
            <button type="submit">
              <PlusCircle className="tf-icon-small" />
              Adicionar
            </button>
          </div>
        </form>
      </section>

      <section className='tf-card'>
        <div className="tf-section-title">
          <List className="tf-icon" /> Histórico de Transações
        </div>
        <div className="tf-grid">
          {transactions.length === 0
            ? <p className="tf-no-data">Nenhuma transação registrada.</p>
            : transactions.map(t => (
              <div key={t._id} className="tf-transaction-card">
                <div>
                  <div className="tf-date">{new Date(t.date).toLocaleDateString()}</div>
                  <div className="tf-category">{t.category}</div>
                </div>
                <div className={`tf-amount ${t.type}`}>
                  {(t.type === 'entrada' ? '+ ' : '- ') + `R$ ${t.amount.toFixed(2)}`}
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
