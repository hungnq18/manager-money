import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../component/Header';
import { UserContext } from '../context/UserContext';

function TransactionDetail() {
  const { transactionId } = useParams();
  const { getTransactionById, categories } = useContext(UserContext);
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const txn = getTransactionById(transactionId);
    if (txn) {
      setTransaction(txn);
    }
  }, [transactionId, getTransactionById]);

  if (!transaction) {
    return <p>Loading transaction details...</p>;
  }

  const categoryName = categories.find(cat => cat.id === transaction.categoryId)?.name || 'Unknown';

  return (
    <div className="transaction-detail">
      <Header />
      <h2>Transaction Detail</h2>
      <p><strong>Description:</strong> {transaction.description}</p>
      <p><strong>Type:</strong> {transaction.type}</p>
      <p><strong>Amount:</strong> {transaction.amount}</p>
      <p><strong>Date:</strong> {transaction.date}</p>
      <p><strong>Category:</strong> {categoryName}</p>
    </div>
  );
}

export default TransactionDetail;
