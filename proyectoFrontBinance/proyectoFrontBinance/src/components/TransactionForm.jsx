import  { useState } from 'react';

// eslint-disable-next-line react/prop-types
const TransactionForm = ({ walletId, onTransaction }) => {
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('deposit');

  const handleSubmit = (e) => {
    e.preventDefault();
    onTransaction({ walletId, amount, type });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Amount:
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
      </label>
      <label>
        Type:
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="deposit">Deposit</option>
          <option value="withdraw">Withdraw</option>
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default TransactionForm;
