import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Header from './Header';

function EditCategories() {
  const { categories, getCategories, addCategory, deleteCategory } = useContext(UserContext);
  const [newCategory, setNewCategory] = useState({ name: '', type: 'expense' });
  const { userId } = useParams(); // Lấy userId từ URL

  useEffect(() => {
    getCategories(userId); // Gọi API để lấy các categories
  }, [getCategories]);

  const handleAddCategory = () => {
    // Thêm userId vào danh mục mới
    const categoryWithUserId = { ...newCategory, userId: Number(userId) };
    addCategory(categoryWithUserId);
    // Reset form sau khi thêm danh mục
    setNewCategory({ name: '', type: 'expense' });
  };

  return (
    <div className="edit-categories">
      <Header />
      <h5>Edit Categories</h5>
      <Link to={`/transaction/user/${userId}`}>Back</Link>

      <Form className="mt-3">
        <Form.Group controlId="categoryName">
          <Form.Label>Category Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter category name" 
            value={newCategory.name} 
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="categoryType" className="mt-3">
          <Form.Label>Type</Form.Label>
          <Form.Select 
            value={newCategory.type} 
            onChange={(e) => setNewCategory({ ...newCategory, type: e.target.value })}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </Form.Select>
        </Form.Group>

        <Button className="mt-3" onClick={handleAddCategory}>Add Category</Button>
      </Form>

      <h5 className="mt-5">Current Categories</h5>
      <ListGroup className="mt-3">
        {categories
          .filter(category => category.userId === Number(userId)) // Lọc danh mục theo userId
          .map((category, index) => (
          <ListGroup.Item key={category.id || index}>
            {category.name} - {category.type}
            <Button 
              variant="danger" 
              className="float-end" 
              onClick={() => deleteCategory(category.id)}
            >
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default EditCategories;
