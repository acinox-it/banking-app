import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

const Accounts = () => {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        axiosInstance.get('/api/accounts/')
            .then(res => setAccounts(res.data))
            .catch(err => console.error('Erreur chargement comptes :', err));
    }, []);

    return (
        <div>
            <h2>Mes comptes bancaires</h2>
            <ul>
                {accounts.map(acc => (
                    <li key={acc.id}>
                        <strong>{acc.account_number}</strong> — {acc.account_type} — {acc.balance} €
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Accounts;
