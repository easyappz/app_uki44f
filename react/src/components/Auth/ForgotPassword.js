import React, { useState } from 'react';
import { instance } from '../../api/axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await instance.post('/api/forgot-password', { email });
      setMessage('Инструкции по восстановлению пароля отправлены на ваш email');
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Ошибка при отправке запроса');
      setMessage('');
    }
  };

  return (
    <div className="auth-form">
      <h2>Восстановление пароля</h2>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Введите ваш email"
          required
        />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};

export default ForgotPassword;