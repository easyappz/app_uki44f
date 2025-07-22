import React, { useState, useEffect } from 'react';
import { Card, Button, Radio, Space, Typography } from 'antd';
import { getPhotosToRate, ratePhoto } from '../../api/photos';

const { Title } = Typography;

const PhotoRating = () => {
  const [photos, setPhotos] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [filters, setFilters] = useState({ gender: 'all', age: 'all' });

  useEffect(() => {
    fetchPhotos();
  }, [filters]);

  const fetchPhotos = async () => {
    try {
      const response = await getPhotosToRate(filters);
      setPhotos(response.data);
      setCurrentPhotoIndex(0);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const handleRate = async (rating) => {
    const currentPhoto = photos[currentPhotoIndex];
    try {
      await ratePhoto(currentPhoto._id, rating);
      if (currentPhotoIndex < photos.length - 1) {
        setCurrentPhotoIndex(currentPhotoIndex + 1);
      } else {
        fetchPhotos();
      }
    } catch (error) {
      console.error('Error rating photo:', error);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
  };

  if (photos.length === 0) {
    return <Title level={3}>Нет доступных фотографий для оценки</Title>;
  }

  const currentPhoto = photos[currentPhotoIndex];

  return (
    <div>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Оценка фотографий</Title>
        
        <Space>
          <Radio.Group
            value={filters.gender}
            onChange={(e) => handleFilterChange('gender', e.target.value)}
          >
            <Radio.Button value="all">Все</Radio.Button>
            <Radio.Button value="male">Мужчины</Radio.Button>
            <Radio.Button value="female">Женщины</Radio.Button>
          </Radio.Group>

          <Radio.Group
            value={filters.age}
            onChange={(e) => handleFilterChange('age', e.target.value)}
          >
            <Radio.Button value="all">Все возрасты</Radio.Button>
            <Radio.Button value="18-25">18-25</Radio.Button>
            <Radio.Button value="26-35">26-35</Radio.Button>
            <Radio.Button value="36+">36+</Radio.Button>
          </Radio.Group>
        </Space>

        <Card
          cover={<img alt="фото для оценки" src={currentPhoto.url} style={{ maxHeight: '400px', objectFit: 'contain' }} />}
          actions={[
            <Button onClick={() => handleRate('dislike')} type="primary" danger>Не нравится</Button>,
            <Button onClick={() => handleRate('like')} type="primary">Нравится</Button>
          ]}
        >
          <Card.Meta
            title={`Фото ${currentPhotoIndex + 1} из ${photos.length}`}
            description={`Лайки: ${currentPhoto.likes}, Дизлайки: ${currentPhoto.dislikes}`}
          />
        </Card>
      </Space>
    </div>
  );
};

export default PhotoRating;
