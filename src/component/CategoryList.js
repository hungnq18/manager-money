import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';
import '../css/transaction.css';

function CategoryList() {
  const { userId } = useParams(); // Lấy userId từ URL nếu có
  const { user } = useContext(AuthContext); // Lấy user từ AuthContext
  const { categories, getCategories, deleteCategory } = useContext(UserContext); // Lấy categories và deleteCategory từ UserContext
  
  const [filterType, setFilterType] = useState(''); // State để lưu giá trị lọc
  
  // Nếu userId không có trong URL, dùng user.id từ AuthContext
  const currentUserId = userId || user?.id;

  // Gọi hàm getCategories để lấy danh sách các danh mục
  useEffect(() => {
    getCategories(currentUserId);
  }, [getCategories, currentUserId]);

  // Lọc danh sách các danh mục theo type
  const filteredCategories = filterType
    ? categories.filter(category => category.type === filterType)
    : categories;

  // Hàm xử lý khi người dùng nhấn nút xóa
  const handleDelete = (categoryId) => {
    deleteCategory(categoryId);
  };

  return (
    <div className="category-list">
      <div className="history-link">
        <p>Transaction history</p>
        <a href={`/history/user/${currentUserId}`}>See all</a>
      </div>
      <div className="history-link">
      <p>Category List</p>
      <Link to={`/edit-categories/user/${currentUserId}`}>Edit</Link>
      </div>
      {/* Form để lọc theo type */}
      <Form.Select 
        className="mt-3" 
        value={filterType} 
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option value="">All Types</option>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </Form.Select>

      <ListGroup flush className="p-3 mt-3">
        {filteredCategories.map(category => (
          <ListGroup.Item key={category.id}>
            {category.name}
            <Button 
              variant="danger"
              className="float-end "
              onClick={() => handleDelete(category.id)} // Gọi hàm xóa khi nhấn nút
            >
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default CategoryList;

