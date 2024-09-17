// Register.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useAuth } from '../context/AuthContext';
import {useNavigate } from 'react-router-dom';

function Register() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    const formData = { firstname, lastname, email, password };

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful!');

        try {
          const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });
    
          const data = await response.json();
    
          if (response.ok) {
            alert('Login successful!');
            login(data.token, data.userId);
            navigate('/deviceControls');  // Redirect to Device Controls Page
          } else {
            alert('Login failed: ' + data.msg);
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred while logging in.');
        }
      } else {
        alert('Registration failed: ' + data.msg);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while registering.');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegisterSubmit}>
        <input type="text" placeholder="First Name" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
        <input type="text" placeholder="Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
      <h2>Already have an account?</h2>
      <p><Link to="/login">Login</Link></p>
    </div>
  );
}

export default Register;
