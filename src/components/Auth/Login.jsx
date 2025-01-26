import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/slices/authSlice';
import Logo from '../../assets/logo.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fetch users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find((user) => user.email === email && user.password === password);

    if (foundUser) {
      // Dispatch login action and navigate to the home page
      dispatch(login({ email: foundUser.email }));
      navigate('/');
    } else {
      setError('Invalid credentials or user not registered.');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-blue-200 flex items-center justify-center bg-secondary">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-8">
          <img src={Logo} alt="DoIt Logo" className="h-12" />
        </div>

        {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-gray-800 hover:cursor-pointer bg-gray-600"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-700">Don't have an account? </span>
          <button
            onClick={handleRegisterRedirect}
            className="text-primary hover:underline font-medium"
          >
            Register here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
