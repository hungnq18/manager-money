import axios from 'axios';
import bcrypt from 'bcryptjs';
import React, { useState } from 'react';
import { FaLock, FaPhone, FaUser } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";
import '../css/login.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    
    if (!username) formErrors.username = 'Username is required';
    if (!email) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = 'Email address is invalid';
    }
    if (!password) {
      formErrors.password = 'Password is required';
    } else if (password.length < 8) {
      formErrors.password = 'Password must be at least 8 characters';
    }
    if (password !== confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
    }
    if (!phone) {
      formErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone)) {
      formErrors.phone = 'Phone number is invalid';
    }
    
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash password
        const userData = {
          username,
          password: hashedPassword,
          email,
          status: 'active',
          registeredAt: new Date().toISOString(),
          settings: {
            theme: 'light',
            backgroundImage: '',
          },
          roleId: 1,
          phone,
        };
        // Send `userData` to your backend for registration
        const response = await axios.post('http://localhost:9999/users', userData);
        if (response.status === 201) {
          alert('User registered successfully!');
          // Redirect to login or another page if necessary
          window.location.href = '/login';
        } else {
          alert('Failed to register user');
        }
      } catch (error) {
        console.error('Error registering user:', error);
        alert('Failed to register user');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="wrapper">
        <form onSubmit={handleRegister}>
          <h1>Register</h1>
          <div className="input-box">
            <input 
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FaUser className="icon" />
          </div>
          {errors.username && <p className="error">{errors.username}</p>}
          
          <div className="input-box">
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className="icon" />
          </div>
          {errors.password && <p className="error">{errors.password}</p>}
          
          <div className="input-box">
            <input 
              type="password" 
              placeholder="Confirm Password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <FaLock className="icon" />
          </div>
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          
          <div className="input-box">
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <MdEmail className="icon" />
          </div>
          {errors.email && <p className="error">{errors.email}</p>}
          
          <div className="input-box">
            <input 
              type="text" 
              placeholder="Phone" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <FaPhone className="icon" />
          </div>
          {errors.phone && <p className="error">{errors.phone}</p>}
          
          <div className="remember-forgot">
            <label><input type="checkbox" required /> Accept terms</label>
            <a href="#">Privacy policy</a>
          </div>
          <button type="submit">Register</button>
          <div className="register-link">
            <p>If you have an account? <a href="/login">Login</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
