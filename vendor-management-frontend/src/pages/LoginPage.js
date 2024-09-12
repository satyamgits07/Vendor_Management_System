import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function LoginPage() {


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });

      // Store token in localStorage or cookies
      localStorage.setItem('token', res.data.token);

      // Redirect based on user role
      if (res.data.role === 'Admin') {
        navigate('/admin');
      } else if (res.data.role === 'Vendor') {
        navigate('/vendor');
      } else {
        navigate('/user');
      }
    } catch (error) {
      alert('Login failed');
    }
  };

  return (

    
    <div>
      <h1>Login</h1>
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
