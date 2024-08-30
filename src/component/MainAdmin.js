import axios from 'axios';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function MainAdmin() {
  const { users, getUsers } = useContext(UserContext);
  const navigate = useNavigate();
  const chartRef = useRef(null);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const handleStatusChange = (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    axios.put(`http://localhost:9999/users/${userId}`, { status: newStatus })
      .then(response => {
        getUsers(); // Refresh the user list after status change
        alert(`User status updated to ${newStatus}`);
      })
      .catch(error => {
        console.error('Error updating user status:', error);
        alert('Failed to update user status');
      });
  };

  const chartData = useMemo(() => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const data = users.reduce((acc, user) => {
      const date = new Date(user.registeredAt);
      const month = date.getMonth();
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    const maxMonth = Object.keys(data).reduce((a, b) => data[a] > data[b] ? a : b, 0);

    return {
      labels: months,
      datasets: [
        {
          label: 'User Registrations Over Time',
          backgroundColor: months.map((_, i) => i === parseInt(maxMonth) ? 'rgba(255, 99, 132, 0.4)' : 'rgba(75, 192, 192, 0.4)'),
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75, 192, 192, 0.6)',
          hoverBorderColor: 'rgba(75, 192, 192, 1)',
          data: months.map((_, index) => data[index] || 0),
        },
      ],
    };
  }, [users]);

  return (
    <div className="p-4">
      <h2>User Management</h2>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Bar data={chartData} ref={chartRef} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h4>User List</h4>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Status</th>
                <th>Registration Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td
                    style={{
                      color: user.status === 'active' ? 'green' : 'red',
                      fontWeight: 'bold',
                    }}
                  >
                    {user.status}
                  </td>
                  <td>{new Date(user.registeredAt).toLocaleDateString()}</td>
                  <td>
                    <Button
                      variant="primary"
                      className="me-2"
                      onClick={() => navigate(`/admin/users/${user.id}`)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant={user.status === 'active' ? 'outline-danger' : 'outline-success'}
                      onClick={() => handleStatusChange(user.id, user.status)}
                    >
                      {user.status === 'active' ? 'Deactivate' : 'Activate'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}

export default MainAdmin;

