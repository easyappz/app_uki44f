import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { uploadPhoto } from '../api/photos';

const PhotoUpload = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await uploadPhoto(values.url);
      message.success('Фото успешно загружено');
      form.resetFields();
    } catch (error) {
      message.error('Ошибка при загрузке фото');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="url"
        label="URL фотографии"
        rules={[{ required: true, message: 'Пожалуйста, введите URL фотографии' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Загрузить фото
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PhotoUpload;