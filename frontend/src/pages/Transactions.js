// src/pages/Transactions.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        axiosInstance.get('/api/transactions/')
            .then(res => setTransactions(res.data))
            .catch(err => console.error('Erreur chargement transactions :', err));
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Mes transactions</h2>
            <table className="table-auto w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th>Date</th>
                        <th>Type</th>
                        <th>Montant</th>
                        <th>Description</th>
                        <th>Compte</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(tx => (
                        <tr key={tx.id}>
                            <td>{new Date(tx.timestamp).toLocaleString()}</td>
                            <td>{tx.transaction_type}</td>
                            <td>{tx.amount} €</td>
                            <td>{tx.description}</td>
                            <td>{tx.account_number}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Transactions;
