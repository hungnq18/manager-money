import axios from 'axios';
import bcrypt from 'bcryptjs';
import React, { useState } from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';
import useAuth from '../hooks/useAuth';
import { BASE_URL } from '../ultils/api';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Gọi API để lấy thông tin người dùng dựa trên username
      const response = await axios.get(`${BASE_URL}/users?username=${username}`);
      const user = response.data[0]; // Giả sử API trả về một mảng người dùng
//       const passwordJohn = '1234';
// const passwordAdmin = 'hung123';

// // Mã hóa mật khẩu
// const hashedPasswordJohn = bcrypt.hashSync(passwordJohn, 10);
// const hashedPasswordAdmin = bcrypt.hashSync(passwordAdmin, 10);

// console.log('Hashed Password for john_doe:', hashedPasswordJohn);
// console.log('Hashed Password for admin:', hashedPasswordAdmin);
      if (user) {
        // So sánh mật khẩu nhập vào với mật khẩu đã mã hóa trong cơ sở dữ liệu
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        console.log("password match:",isPasswordValid);
        if (isPasswordValid) {
          // Nếu mật khẩu hợp lệ, tiến hành đăng nhập
          login.login(user);
          
          // Điều hướng người dùng dựa trên roleId
          if (user.roleId === 2) {
            navigate('/admin-dashboard');
          } else if (user.roleId === 1 || !user.roleId) {
            navigate('/transaction/user/' + user.id);
          }
        } else {
          alert('Invalid username or password');
        }
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login.');
    }
  }

  return (
    <div className="login-page">
      <div className="wrapper">
        <form onSubmit={handleLogin}>
          <h1>Log In</h1>
          <div className="input-box">
            <input 
              type="text" 
              placeholder='Username' 
              value={username} 
              onChange={(event) => setUsername(event.target.value)} 
              required 
            />
            <FaUser className="icon"/>
          </div>
          <div className="input-box">
            <input 
              type="password" 
              placeholder='Password' 
              value={password} 
              onChange={(event) => setPassword(event.target.value)} 
              required 
            />
            <FaLock className="icon"/>
          </div>
          <div className="remember-forgot">
            <label><input type="checkbox"/>Remember me</label>
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit">Login</button>
          <div className="register-link">
            <p>Don't have an account? <a href="/register">Register</a></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;
