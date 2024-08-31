import React, { useContext, useState } from 'react';
import { Badge, Button, Dropdown, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FaBell, FaUsers } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { GroupContext } from '../context/GroupContext';

function Header() {
  const { user, logout } = useContext(AuthContext);
  const { notifications, groups } = useContext(GroupContext);  // Giả sử cả thông báo và nhóm được quản lý trong GroupContext
  const { userId } = useParams();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');

  const currentUserId = userId || user?.id;

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/transaction/user/${currentUserId}/search?query=${searchTerm}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Navbar.Brand href={`/transaction/user/${currentUserId}`}>Money App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href={`/transaction/user/${currentUserId}`}>Transaction</Nav.Link>
          <Nav.Link href={`/report/user/${currentUserId}`}>Report</Nav.Link>
          <Nav.Link href={`/groups/user/${currentUserId}`}>Groups</Nav.Link> {/* Điều hướng đến trang Groups */}
          <NavDropdown title="Settings" id="basic-nav-dropdown">
            <NavDropdown.Item href={`/profile/user/${currentUserId}`}>Profile</NavDropdown.Item>
            <NavDropdown.Item href={`/account-settings/user/${currentUserId}`}>Account Settings</NavDropdown.Item>
            <NavDropdown.Item href={`/manage-expense/user/${currentUserId}`}>Manage Expense</NavDropdown.Item>
            <NavDropdown.Item href={`/manage-income/user/${currentUserId}`}>Manage Income</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        
        <Form className="d-flex" onSubmit={handleSearch}>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline-success" type="submit">Search</Button>
        </Form>
        
        <Dropdown align="end" className="ms-3">
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            <FaBell />
            {notifications && notifications.filter(notification => notification.status === 'unread').length > 0 && (
              <Badge bg="danger">
                {notifications.filter(notification => notification.status === 'unread').length}
              </Badge>
            )}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {notifications && notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <Dropdown.Item key={index} href={`/notifications/${notification.id}`}>
                  {notification.title}
                </Dropdown.Item>
              ))
            ) : (
              <Dropdown.Item>No new notifications</Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown align="end" className="ms-3">
          <Dropdown.Toggle variant="light" id="dropdown-groups">
            <FaUsers />
            {groups && groups.length > 0 && (
              <Badge bg="info">
                {groups.length}
              </Badge>
            )}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {groups && groups.length > 0 ? (
              groups.map((group, index) => (
                <Dropdown.Item key={index} href={`/groups/users/${user?.id}/${group.id}`}>
                  {group.name}
                </Dropdown.Item>
              ))
            ) : (
              <Dropdown.Item>No groups</Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
