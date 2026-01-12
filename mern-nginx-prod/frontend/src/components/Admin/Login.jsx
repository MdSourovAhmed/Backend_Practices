import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = e.target.elements;
    try {
      const { data } = await api.post('/auth/login', {
        username: username.value,
        password: password.value,
      });
      localStorage.setItem('token', data.token);
      navigate('/admin');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-30">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Login</h2>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
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
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
           required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;