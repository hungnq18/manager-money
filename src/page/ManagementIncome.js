import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../component/Header';
import { ThemeContext } from '../context/ThemeContext';

function ManageIncome() {
  const { theme } = useContext(ThemeContext);
  const { userId } = useParams(); // Get userId from URL parameters
  const [income, setIncome] = useState([]);

  useEffect(() => {
    // Fetch transactions for the specific user and filter by type: "income"
    axios.get(`http://localhost:9999/transactions?userId=${userId}`)
      .then(response => {
        const incomeTransactions = response.data.filter(transaction => transaction.type.toLowerCase() === 'income');
        setIncome(incomeTransactions);
      })
      .catch(error => console.error('Error fetching income:', error));
  }, [userId]); // Add userId as a dependency to refetch data when userId changes

  return (
    <div style={{ backgroundColor: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#000' }}>
      <Header />
      <h2>Manage Income</h2>
      <div>
        <h3>Income List</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid', padding: '8px' }}>Date</th>
              <th style={{ border: '1px solid', padding: '8px' }}>Amount</th>
              <th style={{ border: '1px solid', padding: '8px' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {income.map(incomeItem => (
              <tr key={incomeItem.id}>
                <td style={{ border: '1px solid', padding: '8px' }}>{incomeItem.date}</td>
                <td style={{ border: '1px solid', padding: '8px' }}>{incomeItem.amount}</td>
                <td style={{ border: '1px solid', padding: '8px' }}>{incomeItem.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageIncome;

