import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { BanknotesIcon, CreditCardIcon } from '@heroicons/react/24/solid';

const Accounts = () => {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        document.title = 'Accounts - BankingApp';
        axiosInstance.get('/api/accounts/')
            .then(res => setAccounts(res.data))
            .catch(err => console.error('Error loading accounts:', err));
    }, []);

    const formatType = (type) => {
        const isSavings = type.toLowerCase().includes('savings');
        return (
            <span className={`inline-flex items-center px-2 py-1 rounded text-sm font-medium ${isSavings ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-200 text-gray-800'}`}>
                {isSavings ? <BanknotesIcon className="w-4 h-4 mr-1" /> : <CreditCardIcon className="w-4 h-4 mr-1" />}
                {type}
            </span>
        );
    };

    const formatBalance = (balance) => {
        const isNegative = parseFloat(balance) < 0;
        return (
            <span className={`font-semibold ${isNegative ? 'text-red-600' : 'text-green-600'}`}>
                {balance} €
            </span>
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="bg-white border border-black shadow-lg rounded-lg p-8 w-full max-w-2xl">
                <h2 className="text-3xl font-bold text-yellow-600 mb-4 text-center">My Bank Accounts</h2>
                <ul className="space-y-4">
                    {accounts.map(acc => (
                        <li key={acc.id} className="border border-black rounded p-4 shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-800 font-semibold">Account #{acc.account_number}</span>
                                {formatType(acc.account_type)}
                            </div>
                            <div className="text-gray-700">Balance: {formatBalance(acc.balance)}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Accounts;
