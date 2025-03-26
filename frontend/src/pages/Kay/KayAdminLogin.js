import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../pages/Styles/KayAdminLogin.css";

const KayAdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8079/api/admin/login', credentials);
      if (response.data.message === "Login successful") {
        localStorage.setItem('kayAdmin', JSON.stringify(response.data.admin));
        navigate('/kay-admin/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="kay-admin-login-container">
      <h2>Admin Login</h2>
      {error && <div className="kay-error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="kay-form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="kay-form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="kay-login-btn">Login</button>
      </form>
    </div>
  );
};

export default KayAdminLogin;