
import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = e.target.elements;
    try {
      await api.post('/auth/register', {
        username: username.value,
        password: password.value,
      });
      alert('Registered! Please login.');
      navigate('/admin/login');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-30">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;