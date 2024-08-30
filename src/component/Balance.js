import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';
import '../css/transaction.css';

function Balance() {
  const { user } = useContext(AuthContext);
  const { userId } = useParams();
  const { transactions, getTransactions, monthlyBalances, getMonthlyBalances } = useContext(UserContext);

  const [showBalance, setShowBalance] = useState(false);

  useEffect(() => {
    if (userId) {
      getTransactions(userId);
      getMonthlyBalances(userId); // Lấy tổng số dư theo tháng mới nhất
    }
  }, [userId, getTransactions, getMonthlyBalances]);

  // Lấy tổng số dư của tháng mới nhất
  const latestMonthlyBalance = useMemo(() => {
    const sortedMonthlyBalances = monthlyBalances.sort((a, b) => new Date(b.month) - new Date(a.month));
    return sortedMonthlyBalances.length > 0 ? sortedMonthlyBalances[0].balance : 0;
  }, [monthlyBalances]);

  // Lấy 5 giao dịch gần nhất
  const recentTransactions = useMemo(() => {
    const sortedTransactions = transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    return sortedTransactions.slice(0, 5);
  }, [transactions]);

  const toggleBalance = () => {
    setShowBalance(!showBalance);
  };

  return (
    <div>
      <p className="title">Hello, {user.firstName} {user.lastName}</p>
      <Card>
        <Card.Header onClick={toggleBalance} style={{ cursor: 'pointer' }}>
          Balance for Latest Month: {showBalance  ? latestMonthlyBalance +' VND' : '********'+'VND' } {showBalance  ? <FaEye /> : <FaEyeSlash />} 
        </Card.Header>
        <Card.Body>
          <Container>
            <Row>
              <Col md={11}>
                <Card.Title>Recent Transactions</Card.Title>
                <Card.Text>
                  <ListGroup>
                    {showBalance && recentTransactions.map(transaction => (
                      <ListGroup.Item key={transaction.id}>
                        {transaction.date}: {transaction.description} - {transaction.amount} VND
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Text>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Balance;
