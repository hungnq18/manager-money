import React, { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Header from './Header';

function EditTransaction() {
  const { transactionId } = useParams(); // Lấy transactionId từ URL
  const { transactions, categories, getTransaction, editTransaction } = useContext(UserContext); // Lấy các function và data từ context
  const navigate = useNavigate();
  
  const [transaction, setTransaction] = useState(null); // Start with null to handle loading state

  useEffect(() => {
    const transactionToEdit = transactions.find(t => t.id === parseInt(transactionId));
    if (transactionToEdit) {
      setTransaction(transactionToEdit);
    } else {
      getTransaction(transactionId).then(data => setTransaction(data));
    }
  }, [transactionId, transactions, getTransaction]);

  const handleSave = () => {
    if (transaction) {
      editTransaction(transactionId, transaction); // Gọi hàm để lưu thay đổi
      navigate(`/transaction/user/${transaction.userId}`); // Điều hướng người dùng trở về trang giao dịch
    }
  };

  if (!transaction) {
    return <p>Loading transaction...</p>; // Show loading state if transaction is null
  }

  return (
    <div className="edit-transaction">
      <Header />
      <h2>Edit Transaction</h2>
      <Form className="mt-3">
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={transaction.description || ''}
            onChange={(e) => setTransaction({ ...transaction, description: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="type" className="mt-3">
          <Form.Label>Type</Form.Label>
          <Form.Select
            value={transaction.type}
            onChange={(e) => setTransaction({ ...transaction, type: e.target.value })}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="amount" className="mt-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            value={transaction.amount}
            onChange={(e) => setTransaction({ ...transaction, amount: parseFloat(e.target.value) })}
          />
        </Form.Group>

        <Form.Group controlId="date" className="mt-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={transaction.date}
            onChange={(e) => setTransaction({ ...transaction, date: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="categoryId" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={transaction.categoryId}
            onChange={(e) => setTransaction({ ...transaction, categoryId: e.target.value })}
          >
            {categories
              .filter(cat => cat.type === transaction.type)
              .map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
          </Form.Select>
        </Form.Group>

        <Button className="mt-3" onClick={handleSave}>Save Changes</Button>
      </Form>
    </div>
  );
}

export default EditTransaction;
