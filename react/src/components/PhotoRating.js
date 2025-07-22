import React, { useState, useEffect } from 'react';
import { instance } from '../api/axios';

const PhotoRating = () => {
  const [photo, setPhoto] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [filters, setFilters] = useState({ gender: '', ageMin: 18, ageMax: 100 });

  const fetchPhoto = async () => {
    try {
      const response = await instance.get('/api/photos-to-rate');
      if (response.data.length > 0) {
        setPhoto(response.data[0]);
      } else {
        setPhoto(null);
      }
    } catch (error) {
      console.error('Error fetching photo:', error);
    }
  };

  const ratePhoto = async (rating) => {
    try {
      await instance.post('/api/rate-photo', {
        photoId: photo._id,
        rating: rating
      });
      setUserScore(prevScore => prevScore + (rating === 'like' ? 1 : 0));
      fetchPhoto();
    } catch (error) {
      console.error('Error rating photo:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchPhoto();
  }, [filters]);

  if (!photo) {
    return <div>Нет доступных фотографий для оценки</div>;
  }

  return (
    <div className="photo-rating">
      <h2>Оценка фотографий</h2>
      <div className="filters">
        <select name="gender" onChange={handleFilterChange} value={filters.gender}>
          <option value="">Все</option>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
          <option value="other">Другой</option>
        </select>
        <input
          type="number"
          name="ageMin"
          min="18"
          max="100"
          value={filters.ageMin}
          onChange={handleFilterChange}
          placeholder="Мин. возраст"
        />
        <input
          type="number"
          name="ageMax"
          min="18"
          max="100"
          value={filters.ageMax}
          onChange={handleFilterChange}
          placeholder="Макс. возраст"
        />
      </div>
      <div className="photo-container">
        <img src={photo.url} alt="Фото для оценки" />
      </div>
      <div className="rating-buttons">
        <button onClick={() => ratePhoto('like')}>Нравится</button>
        <button onClick={() => ratePhoto('dislike')}>Не нравится</button>
      </div>
      <div className="user-score">
        Ваш счет: {userScore}
      </div>
    </div>
  );
};

export default PhotoRating;