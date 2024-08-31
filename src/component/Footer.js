import React from 'react';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <h5>ManagerMoney</h5>
            <Nav className="flex-column">
              <Nav.Link href="/transaction/user/:userId" className="text-light">
                Transaction
              </Nav.Link>
              <Nav.Link href="/report/user/:userId" className="text-light">
                Report
              </Nav.Link>
              <Nav.Link href="/setting" className="text-light">
                Setting
              </Nav.Link>
            </Nav>
          </Col>
          <Col md={4} className="mb-3 text-center">
            <h5>Stay Connected</h5>
            <div className="d-flex justify-content-center">
              <Nav.Link href="https://facebook.com" className="text-light">
                <FaFacebook size={24} />
              </Nav.Link>
              <Nav.Link href="https://twitter.com" className="text-light">
                <FaTwitter size={24} />
              </Nav.Link>
              <Nav.Link href="https://instagram.com" className="text-light">
                <FaInstagram size={24} />
              </Nav.Link>
            </div>
            <p className="mt-2">Follow us on social media</p>
          </Col>
          <Col md={4} className="mb-3 text-right">
            <p>Version 1.0.0</p>
            <p>Copyright © 2023. All rights reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
