import React, { createContext, useState, useMemo, useContext } from 'react';

const FinanceContext = createContext();

const initialTransactions = [
  { id: 1, date: '2026-04-01', amount: 5000, category: 'Salary', type: 'income' },
  { id: 2, date: '2026-04-03', amount: 150, category: 'Groceries', type: 'expense' },
  { id: 3, date: '2026-04-05', amount: 60, category: 'Entertainment', type: 'expense' },
  { id: 4, date: '2026-04-06', amount: 100, category: 'Utilities', type: 'expense' },
  { id: 5, date: '2026-04-08', amount: 300, category: 'Freelance', type: 'income' },
];

export const FinanceProvider = ({ children }) => {
  const [transactions] = useState(initialTransactions);
  const [role, setRole] = useState('viewer'); 
  const [searchTerm, setSearchTerm] = useState('');

  const totalIncome = useMemo(() => 
    transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0)
  , [transactions]);

  const totalExpense = useMemo(() => 
    transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0)
  , [transactions]);

  const balance = totalIncome - totalExpense;

  return (
    <FinanceContext.Provider value={{
      transactions, role, setRole, searchTerm, setSearchTerm, totalIncome, totalExpense, balance
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);