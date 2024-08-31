import  { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserWallets } from '../services/walletService';

const WalletList = ({ userId }) => {
const [wallets, setWallets] = useState([]);

useEffect(() => {
    const fetchWallets = async () => {
    const data = await getUserWallets(userId);
    setWallets(data);
    };

    fetchWallets();
}, [userId]);

return (
    <div>
    <h2>Tus billeteras</h2>
    <ul>
        {wallets.map(wallet => (
        <li key={wallet.id}>
            {wallet.moneda}: {wallet.saldo} ({wallet.valorUsd} USD)
        </li>
        ))}
    </ul>
    </div>
);
};

WalletList.propTypes = {
userId: PropTypes.string.isRequired,
};

export default WalletList;
