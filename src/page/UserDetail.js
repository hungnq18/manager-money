import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function UserDetail() {
  const { userId } = useParams();
  const { users, getUsers } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (users.length === 0) {
      getUsers();
    } else {
      const selectedUser = users.find(u => u.id.toString() === userId);
      setUser(selectedUser);
    }
  }, [userId, users, getUsers]);

  const handleStatusChange = (status) => {
    axios.put(`http://localhost:9999/users/${userId}`, { status })
      .then(response => {
        setUser(prevUser => ({ ...prevUser, status }));
        alert('Status updated successfully!');
      })
      .catch(error => console.error('Error updating status:', error));
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <Card.Header>
        <h3>User Details</h3>
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" readOnly value={user.username} />
          </Form.Group>

          <Form.Group controlId="email" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" readOnly value={user.email} />
          </Form.Group>

          <Form.Group controlId="firstName" className="mt-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" readOnly value={user.firstName} />
          </Form.Group>

          <Form.Group controlId="lastName" className="mt-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" readOnly value={user.lastName} />
          </Form.Group>

          <Form.Group controlId="phone" className="mt-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" readOnly value={user.phone || 'N/A'} />
          </Form.Group>

          <Form.Group controlId="status" className="mt-3">
            <Form.Label>Status</Form.Label>
            <Form.Control as="select" value={user.status} onChange={(e) => handleStatusChange(e.target.value)}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Form.Control>
          </Form.Group>
        </Form>

        <Button variant="secondary" className="mt-4" onClick={() => navigate('/admin-dashboard')}>
          Back to List
        </Button>
      </Card.Body>
    </Card>
  );
}

export default UserDetail;
