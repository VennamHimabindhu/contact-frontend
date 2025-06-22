import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { FaEnvelope } from 'react-icons/fa';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!email) {
      setError('Please enter your email.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Reset link sent to your email!');
      } else {
        setError(data.error || 'Email not found. Please register.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleReset} className="login-form">
        <h2 className="login-title">Forgot Password</h2>

        <div className="input-wrapper">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            placeholder="Enter your email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {error && <p className="login-error">{error}</p>}
        {message && <p className="login-success">{message}</p>}

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>

        <p style={{ marginTop: '20px' }}>
          <Link to="/" className="login-link">Back to Login</Link>
        </p>
      </form>
    </div>
  );
}

export default ResetPassword;
