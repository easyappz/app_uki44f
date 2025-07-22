import instance from './axios';

export const getUserStats = async () => {
  try {
    const response = await instance.get('/api/user-stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching user stats:', error);
    throw error;
  }
};
