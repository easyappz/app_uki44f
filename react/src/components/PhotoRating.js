import React, { useEffect, useState } from 'react';
import { Card, Button, message } from 'antd';
import { getPhotosToRate, ratePhoto } from '../api/photos';

const PhotoRating = () => {
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNextPhoto();
  }, []);

  const fetchNextPhoto = async () => {
    try {
      const photos = await getPhotosToRate();
      if (photos.length > 0) {
        setCurrentPhoto(photos[0]);
      } else {
        setCurrentPhoto(null);
        message.info('Нет доступных фотографий для оценки');
      }
    } catch (error) {
      message.error('Ошибка при загрузке фотографии');
    } finally {
      setLoading(false);
    }
  };

  const handleRate = async (rating) => {
    if (!currentPhoto) return;

    try {
      await ratePhoto(currentPhoto._id, rating);
      message.success('Оценка сохранена');
      fetchNextPhoto();
    } catch (error) {
      message.error('Ошибка при сохранении оценки');
    }
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!currentPhoto) {
    return <div>Нет доступных фотографий для оценки</div>;
  }

  return (
    <Card
      cover={<img alt="photo" src={currentPhoto.url} />}
      actions={[
        <Button onClick={() => handleRate('like')}>Нравится</Button>,
        <Button onClick={() => handleRate('dislike')}>Не нравится</Button>
      ]}
    />
  );
};

export default PhotoRating;