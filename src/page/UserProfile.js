import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Header from '../component/Header';
import { AuthContext } from '../context/AuthContext';

function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const updatedUser = { ...user, firstName, lastName, email };

    try {
      const response = await axios.put(`http://localhost:9999/users/${user.id}`, updatedUser);
      setUser(response.data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('An error occurred while updating your profile.');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New password and confirmation do not match.");
      return;
    }

    try {
      await axios.post(`http://localhost:9999/users/${user.id}/change-password`, {
        currentPassword,
        newPassword,
      });
      alert('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Failed to change password:', error);
      alert('An error occurred while changing your password.');
    }
  };

  return (
    <Container>
        <Header />
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2 className="mb-4">User Profile</h2>
          <Form onSubmit={handleSaveProfile}>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formLastName" className="mt-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled // Usually, emails are not editable
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4">
              Save Changes
            </Button>
          </Form>

          <h3 className="mt-5">Change Password</h3>
          <Form onSubmit={handleChangePassword}>
            <Form.Group controlId="formCurrentPassword" className="mt-3">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formNewPassword" className="mt-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword" className="mt-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="danger" type="submit" className="mt-4">
              Change Password
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
