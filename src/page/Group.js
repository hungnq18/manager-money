import React, { useContext } from 'react';
import Footer from '../component/Footer';
import Header from '../component/Header';
import { GroupContext } from '../context/GroupContext';
import '../css/transaction.css';

function GroupDetails() {
  const { currentGroup, transactions } = useContext(GroupContext); // Giả sử 'transactions' chứa tất cả các giao dịch

  if (!currentGroup) {
    return <div>Loading group details...</div>;
  }

  const handleAddMember = () => {
    alert('Add Member functionality here!');
  };

  // Lọc ra các giao dịch thuộc nhóm hiện tại
  const groupTransactions = transactions.filter(transaction => 
    currentGroup.transactions.includes(transaction.id)
  );

  return (
    <div className="grid-container">
      <div className="header">
        <Header />
      </div>
      <div className="Main">
        <h2>{currentGroup.name}</h2>
        
        <div className="group-members">
          <h3>Group Members</h3>
          <ul>
            {currentGroup.members.map((memberId) => (
              <li key={memberId}>Member ID: {memberId}</li>
            ))}
          </ul>
          <button onClick={handleAddMember}>Add Member</button>
        </div>

        <div className="group-transactions">
          <h3>Group Transactions</h3>
          <ul>
            {groupTransactions.length > 0 ? (
              groupTransactions.map((transaction) => (
                <li key={transaction.id}>
                  {transaction.description} - {transaction.amount}
                </li>
              ))
            ) : (
              <li>No transactions available</li>
            )}
          </ul>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default GroupDetails;
