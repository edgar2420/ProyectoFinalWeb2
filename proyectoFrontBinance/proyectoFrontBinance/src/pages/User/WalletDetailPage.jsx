import { useParams } from 'react-router-dom';
import WalletDetail from '../../components/WalletDetail';
import TransactionForm from '../../components/TransactionForm';

const WalletDetailPage = () => {
  const { id } = useParams();

  // eslint-disable-next-line no-unused-vars
  const handleTransaction = async ({ walletId, amount, type }) => {
    // Implement transaction logic here (e.g., call a service to perform the transaction)
  };

  return (
    <div>
      <WalletDetail walletId={id} />
      <TransactionForm walletId={id} onTransaction={handleTransaction} />
    </div>
  );
};

export default WalletDetailPage;
