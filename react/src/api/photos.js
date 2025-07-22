import instance from './axios';

export const uploadPhoto = (url) => {
  return instance.post('/api/upload-photo', { url });
};

export const getUserPhotos = () => {
  return instance.get('/api/user-photos');
};

export const deletePhoto = (photoId) => {
  return instance.delete(`/api/delete-photo/${photoId}`);
};

export const getPhotosToRate = () => {
  return instance.get('/api/photos-to-rate');
};

export const ratePhoto = (photoId, rating) => {
  return instance.post('/api/rate-photo', { photoId, rating });
};