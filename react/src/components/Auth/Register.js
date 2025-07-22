import React, { useState } from 'react';
import { register } from '../../api/auth';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    gender: '',
    age: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await register(formData);
      alert('Регистрация успешна!');
      setFormData({ email: '', password: '', gender: '', age: '' });
    } catch (error) {
      let errorMessage = 'Произошла ошибка при регистрации. Пожалуйста, попробуйте снова.';
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = error.response.data.message || 'Проверьте правильность введенных данных.';
          if (errorMessage.includes('email')) {
            errorMessage = 'Этот email уже зарегистрирован. Используйте другой email.';
          }
        } else if (error.response.status === 500) {
          errorMessage = 'Ошибка сервера. Пожалуйста, попробуйте позже.';
        }
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form" style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Регистрация</h2>
      {error && (
        <div style={{ 
          backgroundColor: '#ffebee', 
          color: '#c62828', 
          padding: '10px', 
          borderRadius: '4px', 
          marginBottom: '20px', 
          textAlign: 'center' 
        }}>
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={{ 
            padding: '10px', 
            border: '1px solid #ccc', 
            borderRadius: '4px', 
            fontSize: '16px' 
          }}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Пароль"
          required
          style={{ 
            padding: '10px', 
            border: '1px solid #ccc', 
            borderRadius: '4px', 
            fontSize: '16px' 
          }}
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          style={{ 
            padding: '10px', 
            border: '1px solid #ccc', 
            borderRadius: '4px', 
            fontSize: '16px' 
          }}
        >
          <option value="">Выберите пол</option>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
          <option value="other">Другой</option>
        </select>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Возраст"
          min="18"
          max="100"
          required
          style={{ 
            padding: '10px', 
            border: '1px solid #ccc', 
            borderRadius: '4px', 
            fontSize: '16px' 
          }}
        />
        <button 
          type="submit" 
          disabled={isLoading}
          style={{ 
            padding: '10px', 
            backgroundColor: isLoading ? '#cccccc' : '#1976d2', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            fontSize: '16px', 
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s' 
          }}
        >
          {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>
    </div>
  );
};

export default Register;