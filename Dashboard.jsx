import React from 'react';
import { useFinance } from './FinanceContext';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const { totalIncome, totalExpense, balance, transactions } = useFinance();

  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

  const pieData = Object.keys(expensesByCategory).map(key => ({
    name: key,
    value: expensesByCategory[key]
  }));

  const COLORS = ['#ef4444', '#f97316', '#eab308', '#3b82f6'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Balance</h3>
          <p className="text-3xl font-bold mt-2">${balance.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Income</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">+${totalIncome.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Expenses</h3>
          <p className="text-3xl font-bold mt-2 text-red-600">-${totalExpense.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold mb-4">Spending Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold mb-4">Quick Insights</h3>
          <ul className="space-y-4">
            <li className="p-4 bg-blue-50 rounded-lg text-blue-800">
              Highest spending: <span className="font-bold">{pieData.length > 0 ? pieData.reduce((prev, current) => (prev.value > current.value) ? prev : current).name : "N/A"}</span>
            </li>
            <li className="p-4 bg-green-50 rounded-lg text-green-800">
              Savings Rate: <span className="font-bold">{totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(0) : 0}%</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}