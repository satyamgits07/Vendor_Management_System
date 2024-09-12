import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User'); // Default role is User
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
       await axios.post('http://localhost:5000/api/auth/signup', {
        username,
        password,
        role,
      });
      alert('User registered successfully!');
      navigate('/'); // Redirect to login page after successful signup
    } catch (error) {
      alert('Sign-up failed');
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="User">User</option>
          <option value="Vendor">Vendor</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpPage;
