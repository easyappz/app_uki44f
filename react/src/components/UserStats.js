import React, { useState, useEffect } from 'react';
import { Card, Statistic, Row, Col } from 'antd';
import { TrophyOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import { getUserStats } from '../api/userStats';

const UserStats = () => {
  const [stats, setStats] = useState({
    points: 0,
    ratedPhotos: 0,
    receivedRatings: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getUserStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch user stats:', error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <Card title="Ваша статистика" className="user-stats-card">
      <Row gutter={16}>
        <Col span={8}>
          <Statistic
            title="Баллы"
            value={stats.points}
            prefix={<TrophyOutlined />}
            valueStyle={{ color: '#3f8600' }}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="Оценено фото"
            value={stats.ratedPhotos}
            prefix={<LikeOutlined />}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="Получено оценок"
            value={stats.receivedRatings}
            prefix={<DislikeOutlined />}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default UserStats;
