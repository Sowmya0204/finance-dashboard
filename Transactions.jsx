import React from 'react';
import { useFinance } from './FinanceContext';

export default function Transactions() {
  const { transactions, role, searchTerm, setSearchTerm } = useFinance();

  const filteredTransactions = transactions.filter(t => 
    t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.date.includes(searchTerm)
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center bg-gray-50">
        <input 
          type="text" 
          placeholder="Search categories or dates..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded-lg w-64 outline-none focus:ring-2 focus:ring-blue-500"
        />
        {role === 'admin' && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            + Add Transaction
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-medium text-gray-500">Date</th>
              <th className="p-4 font-medium text-gray-500">Category</th>
              <th className="p-4 font-medium text-gray-500">Amount</th>
              {role === 'admin' && <th className="p-4 font-medium text-gray-500 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((t) => (
                <tr key={t.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4">{t.date}</td>
                  <td className="p-4">{t.category}</td>
                  <td className={`p-4 font-medium ${t.type === 'income' ? 'text-green-600' : 'text-gray-800'}`}>
                    {t.type === 'income' ? '+' : '-'}${t.amount}
                  </td>
                  {role === 'admin' && (
                    <td className="p-4 text-right">
                      <button className="text-sm text-blue-600 hover:underline mr-3">Edit</button>
                      <button className="text-sm text-red-600 hover:underline">Delete</button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={role === 'admin' ? 4 : 3} className="p-8 text-center text-gray-500">
                  No transactions match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}