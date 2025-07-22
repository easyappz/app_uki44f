import React, { useState, useEffect } from 'react';
import { instance } from '../api/axios';

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await instance.get('/api/user-photos');
      setPhotos(response.data);
    } catch (error) {
      setError('Ошибка при загрузке фотографий');
    }
  };

  const togglePhotoStatus = async (photoId, isActive) => {
    try {
      await instance.post(`/api/toggle-photo-status/${photoId}`, { isActive });
      fetchPhotos(); // Обновляем список после изменения статуса
    } catch (error) {
      setError('Ошибка при изменении статуса фотографии');
    }
  };

  return (
    <div className="photo-list">
      <h2>Ваши фотографии</h2>
      {error && <p className="error">{error}</p>}
      {photos.map(photo => (
        <div key={photo._id} className="photo-item">
          <img src={photo.url} alt="Uploaded" />
          <p>Пол: {photo.gender}, Возраст: {photo.age}</p>
          <button onClick={() => togglePhotoStatus(photo._id, !photo.isActive)}>
            {photo.isActive ? 'Деактивировать' : 'Активировать'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PhotoList;