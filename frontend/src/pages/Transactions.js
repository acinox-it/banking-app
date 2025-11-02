import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/solid';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    document.title = 'Transactions - BankingApp';
    axiosInstance.get('/api/transactions/')
      .then(res => setTransactions(res.data))
      .catch(err => console.error('Error loading transactions:', err));
  }, []);

  const formatType = (type) => {
    const isDeposit = type.toLowerCase() === 'deposit';
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded text-sm font-medium ${isDeposit ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {isDeposit ? <ArrowDownIcon className="w-4 h-4 mr-1" /> : <ArrowUpIcon className="w-4 h-4 mr-1" />}
        {type}
      </span>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white border border-black shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-yellow-600 mb-4 text-center">My Transactions</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-black">
            <thead className="bg-yellow-100 text-black">
              <tr>
                <th className="border border-black px-4 py-2">Date</th>
                <th className="border border-black px-4 py-2">Type</th>
                <th className="border border-black px-4 py-2">Amount</th>
                <th className="border border-black px-4 py-2">Description</th>
                <th className="border border-black px-4 py-2">Account</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx.id} className="text-gray-700">
                  <td className="border border-black px-4 py-2">{new Date(tx.timestamp).toLocaleString()}</td>
                  <td className="border border-black px-4 py-2">{formatType(tx.transaction_type)}</td>
                  <td className={`border border-black px-4 py-2 font-semibold ${tx.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {tx.amount} €
                  </td>
                  <td className="border border-black px-4 py-2">{tx.description}</td>
                  <td className="border border-black px-4 py-2">{tx.account_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
