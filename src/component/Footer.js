import React from 'react'
import { Col, Container, Nav, Row } from 'react-bootstrap'

function Footer() {
  return (
    <div>
      <div className="footer">
        <Container>
          <Row> 
            <Col md  = {4}>
             <Nav activeKey="/transaction/user/:userId">
              Transaction
             </Nav>
             <Nav activeKey="/report/user/:userId">
              Report
             </Nav>
             <Nav activeKey="/setting">
              Setting
             </Nav>
            </Col>
            <Col md = {4}>
              <p>Copyright © 2023. All rights reserved</p>
              <p>Version 1.0.0</p>
            </Col>
            <Col md = {4}><p>ManagerMoney</p>
            <p>Copyright © 2023. All rights reserved</p>
              <p>Version 1.0.0</p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default Footer 