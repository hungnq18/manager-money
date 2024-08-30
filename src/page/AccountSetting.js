import React, { useContext } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import Header from '../component/Header';
import { ThemeContext } from '../context/ThemeContext';

function AccountSettings() {
  const { theme, changeTheme, backgroundImage, changeBackgroundImage, saveSettings } = useContext(ThemeContext);

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    changeTheme(newTheme);
  };

  const handleBackgroundChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        changeBackgroundImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = () => {
    saveSettings();  // Gọi hàm lưu cài đặt và hiển thị thông báo
  };

  return (
    <Container>
      <Header />
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <h2 className="mb-4">Account Settings</h2>
          <Card>
            <Card.Body>
              <Form>
                <Form.Group controlId="formTheme" className="mb-3">
                  <Form.Label>Theme</Form.Label>
                  <Form.Check
                    type="radio"
                    label="Light"
                    value="light"
                    checked={theme === 'light'}
                    onChange={handleThemeChange}
                  />
                  <Form.Check
                    type="radio"
                    label="Dark"
                    value="dark"
                    checked={theme === 'dark'}
                    onChange={handleThemeChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBackgroundImage" className="mb-3">
                  <Form.Label>Change Background Image</Form.Label>
                  <Form.Control type="file" accept="image/*" onChange={handleBackgroundChange} />
                </Form.Group>

                <Button variant="primary" onClick={handleSaveSettings}>
                  Save Settings
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AccountSettings;
