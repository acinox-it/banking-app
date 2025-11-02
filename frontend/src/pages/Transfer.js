import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { BanknotesIcon } from '@heroicons/react/24/solid';

const Transfer = () => {
    const [accounts, setAccounts] = useState([]);
    const [fromAccount, setFromAccount] = useState('');
    const [toAccountNumber, setToAccountNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = 'Transfer - BankingApp';
        axiosInstance.get('/api/accounts/')
            .then(res => setAccounts(res.data))
            .catch(err => console.error('Error loading accounts:', err));
    }, []);

    const handleTransfer = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        if (!fromAccount || !toAccountNumber || !amount) {
            setMessage('❌ All fields are required.');
            setLoading(false);
            return;
        }

        try {
            await axiosInstance.post('/api/transactions/', {
                bank_account: fromAccount,
                destination_account_number: toAccountNumber,
                amount: parseFloat(amount),
                description,
                transaction_type: 'transfer',
            });
            setMessage('✅ Transfer completed successfully.');
            setAmount('');
            setToAccountNumber('');
            setDescription('');
        } catch (err) {
            if (err.response?.data) {
                console.log('Backend error:', err.response.data);
                const errors = Object.values(err.response.data).flat().join(' ');
                setMessage(`❌ ${errors}`);
            } else {
                setMessage('❌ Unknown error during transfer.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="bg-white border border-black shadow-lg rounded-lg p-8 w-full max-w-xl">
                <h2 className="text-3xl font-bold text-yellow-600 mb-4 text-center flex items-center justify-center gap-2">
                    <BanknotesIcon className="w-7 h-7 text-yellow-600" />
                    Make a Transfer
                </h2>

                <form onSubmit={handleTransfer} className="space-y-4">
                    <div>
                        <label className="block text-gray-800 mb-1">Source Account</label>
                        <select
                            value={fromAccount}
                            onChange={(e) => setFromAccount(e.target.value)}
                            className="w-full border border-black rounded px-3 py-2"
                            required
                        >
                            <option value="">-- Select --</option>
                            {accounts.map(acc => (
                                <option key={acc.id} value={acc.id}>
                                    {acc.account_number} ({acc.balance} €)
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-800 mb-1">Recipient Account</label>
                        <input
                            type="text"
                            value={toAccountNumber}
                            onChange={(e) => setToAccountNumber(e.target.value)}
                            className="w-full border border-black rounded px-3 py-2"
                            placeholder="Account number (e.g. ACC1023)"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-800 mb-1">Amount (€)</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full border border-black rounded px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-800 mb-1">Description</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border border-black rounded px-3 py-2"
                            placeholder="Rent, reimbursement, etc."
                        />
                    </div>

                    {message && (
                        <div className={`text-center text-sm font-semibold transition-opacity duration-500 ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full font-bold py-2 rounded transition ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600 text-black'
                            }`}
                    >
                        {loading ? 'Sending...' : 'Submit Transfer'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Transfer;
