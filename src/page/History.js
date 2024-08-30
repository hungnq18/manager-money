import React, { useContext, useEffect, useMemo } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../component/Header';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';

function History() {
  const { user } = useContext(AuthContext);
  const { userId } = useParams();
  const { transactions, getTransactions, categories, getCategories, deleteTransaction } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      getTransactions(userId);
      getCategories(userId); // Fetch categories to display category names
    }
  }, [userId, getTransactions, getCategories]);

  const handleDelete = (transactionId) => {
    // Call the function to delete the transaction
    deleteTransaction(transactionId);
  };

  const handleEdit = (transactionId) => {
    // Navigate to an edit form page
    navigate(`/edit-transaction/${transactionId}`);
  };

  const handleDetail = (transactionId) => {
    // Navigate to a detailed view page
    navigate(`/transaction-detail/${transactionId}`);
  };

  const transactionRows = useMemo(() => {
    return transactions.map((transaction, index) => {
      const categoryName = categories.find(cat => cat.id == transaction.categoryId)?.name || 'Unknown';
      return (
        <tr key={transaction.id || index}>
          <td>{index + 1}</td>
          <td>{transaction.description}</td>
          <td>{transaction.type}</td>
          <td>{categoryName}</td> {/* Display category name */}
          <td>{transaction.amount}</td>
          <td>{transaction.date}</td>
          <td>
            <Button variant="outline-danger" onClick={() => handleDelete(transaction.id)}>
              Delete
            </Button>
            <Button variant="outline-primary" onClick={() => handleEdit(transaction.id)}>
              Edit
            </Button>
            <Button variant="outline-success" onClick={() => handleDetail(transaction.id)}>
              Detail
            </Button>
          </td>
        </tr>
      );
    });
  }, [transactions, categories]);

  return (
    <>
      <Header />
      <h2 className="title">History Transaction</h2>
      {transactions.length > 0 ? (
        <Table striped bordered responsive hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Description</th>
              <th>Type</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{transactionRows}</tbody>
        </Table>
      ) : (
        <p>No transactions found.</p>
      )}
    </>
  );
}

export default History;
