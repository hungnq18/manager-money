import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import '../css/transaction.css';

function AddFinanceButton() {
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('');

  const { addTransaction, categories, getCategories } = useContext(UserContext);
  const { userId } = useParams(); // Lấy userId từ URL

  useEffect(() => {
    getCategories(userId); // Lấy danh sách categories từ API khi component được mount
  }, [getCategories]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Lọc danh sách các category dựa trên type được chọn
  const filteredCategories = type ? categories.filter(cat => cat.type === type.toLowerCase()) : [];

  const handleSave = () => {
    const newTransaction = {
      amount: parseFloat(amount),
      description,
      category,
      date,
      type,
      userId: Number(userId), // Sử dụng userId từ useParams để thêm vào transaction
    };

    // Gọi hàm addTransaction để lưu transaction mới
    addTransaction(userId, newTransaction);

    // Đóng modal và reset form
    handleClose();
    setAmount('');
    setDescription('');
    setCategory('');
    setDate('');
    setType('');
  };

  return (
    <>
      <Button variant="success" onClick={handleShow} className="add-finance-btn">
        <i className="fas fa-plus-circle"></i> <i className="fas fa-wallet"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Finance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formType" className="mt-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setCategory(''); // Reset category khi type thay đổi
                }}
              >
                <option value="">Choose...</option>
                <option value="Expense">Expense</option>
                <option value="Income">Income</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="formCategory" className="mt-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={!type} // Vô hiệu hóa khi type chưa được chọn
              >
                <option value="">Choose...</option>
                {filteredCategories.map((cat) => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="formDate" className="mt-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddFinanceButton;
