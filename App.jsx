import React, { useState } from 'react';
import { FinanceProvider, useFinance } from './FinanceContext';
import Dashboard from './Dashboard';
import Transactions from './Transactions';

const AppContent = () => {
  const { role, setRole } = useFinance();
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center border-b border-blue-100">
        <h1 className="text-xl font-bold text-blue-600">Finance Dashboard</h1>
        <select 
          value={role} 
          onChange={(e) => setRole(e.target.value)}
          className="border rounded p-1 text-sm bg-white"
        >
          <option value="viewer">Viewer Mode</option>
          <option value="admin">Admin Mode</option>
        </select>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <div className="flex gap-4 mb-6 border-b">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`pb-2 px-4 ${activeTab === 'dashboard' ? 'text-blue-600 border-b-2 border-blue-600 font-bold' : 'text-gray-500'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('transactions')}
            className={`pb-2 px-4 ${activeTab === 'transactions' ? 'text-blue-600 border-b-2 border-blue-600 font-bold' : 'text-gray-500'}`}
          >
            Transactions
          </button>
        </div>

        {activeTab === 'dashboard' ? <Dashboard /> : <Transactions />}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <FinanceProvider>
      <AppContent />
    </FinanceProvider>
  );
}