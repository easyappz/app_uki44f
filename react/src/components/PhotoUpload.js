import React, { useState } from 'react';
import { instance } from '../api/axios';

const PhotoUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Пожалуйста, выберите файл');
      return;
    }

    const formData = new FormData();
    formData.append('photo', file);

    try {
      await instance.post('/api/upload-photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccess('Фотография успешно загружена');
      setError('');
      setFile(null);
    } catch (error) {
      setError(error.response?.data?.message || 'Ошибка при загрузке фотографии');
      setSuccess('');
    }
  };

  return (
    <div className="photo-upload">
      <h2>Загрузка фотографии</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button type="submit">Загрузить</button>
      </form>
    </div>
  );
};

export default PhotoUpload;