import React, { useEffect, useState } from 'react';
import { List, Card, Button, message } from 'antd';
import { getUserPhotos, deletePhoto } from '../api/photos';

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const data = await getUserPhotos();
      setPhotos(data);
    } catch (error) {
      message.error('Ошибка при загрузке фотографий');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (photoId) => {
    try {
      await deletePhoto(photoId);
      message.success('Фото успешно удалено');
      fetchPhotos();
    } catch (error) {
      message.error('Ошибка при удалении фото');
    }
  };

  return (
    <List
      grid={{ gutter: 16, column: 3 }}
      dataSource={photos}
      loading={loading}
      renderItem={(photo) => (
        <List.Item>
          <Card
            cover={<img alt="photo" src={photo.url} />}
            actions={[
              <Button onClick={() => handleDelete(photo._id)}>Удалить</Button>
            ]}
          >
            <Card.Meta
              title={`Лайки: ${photo.likes}`}
              description={`Дизлайки: ${photo.dislikes}`}
            />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default PhotoList;