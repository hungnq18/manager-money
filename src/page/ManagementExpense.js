import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../component/Header';
import { ThemeContext } from '../context/ThemeContext';

function ManageExpense() {
  const { theme } = useContext(ThemeContext);
  const { userId } = useParams(); // Get userId from URL parameters
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetch transactions for the specific user and filter by type: "expense"
    axios.get(`http://localhost:9999/transactions?userId=${userId}`)
      .then(response => {
        const expenseTransactions = response.data.filter(transaction => transaction.type.toLowerCase() === 'expense');
        setExpenses(expenseTransactions);
      })
      .catch(error => console.error('Error fetching expenses:', error));
  }, [userId]); // Add userId as a dependency to refetch data when userId changes

  return (
    <div style={{ backgroundColor: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#000' }}>
      <Header />
      <h2>Manage Expenses</h2>
      <div>
        <h3>Expense List</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid', padding: '8px' }}>Date</th>
              <th style={{ border: '1px solid', padding: '8px' }}>Amount</th>
              <th style={{ border: '1px solid', padding: '8px' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => (
              <tr key={expense.id}>
                <td style={{ border: '1px solid', padding: '8px' }}>{expense.date}</td>
                <td style={{ border: '1px solid', padding: '8px' }}>{expense.amount}</td>
                <td style={{ border: '1px solid', padding: '8px' }}>{expense.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageExpense;

