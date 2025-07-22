import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import ErrorBoundary from './ErrorBoundary';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import ForgotPassword from './components/Auth/ForgotPassword';
import PhotoUpload from './components/PhotoUpload';
import PhotoList from './components/PhotoList';
import PhotoRating from './components/PhotoRating';
import UserStats from './components/UserStats';
import './App.css';

const { Header, Content, Footer } = Layout;

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <ErrorBoundary>
      <Router>
        <Layout className="layout">
          <Header>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item key="1"><Link to="/">Главная</Link></Menu.Item>
              {!isAuthenticated && (
                <>
                  <Menu.Item key="2"><Link to="/register">Регистрация</Link></Menu.Item>
                  <Menu.Item key="3"><Link to="/login">Вход</Link></Menu.Item>
                </>
              )}
              {isAuthenticated && (
                <>
                  <Menu.Item key="4"><Link to="/upload-photo">Загрузить фото</Link></Menu.Item>
                  <Menu.Item key="5"><Link to="/my-photos">Мои фотографии</Link></Menu.Item>
                  <Menu.Item key="6"><Link to="/rate-photos">Оценка фотографий</Link></Menu.Item>
                  <Menu.Item key="7" onClick={() => {
                    localStorage.removeItem('token');
                    window.location.reload();
                  }}>Выход</Menu.Item>
                </>
              )}
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content">
              {isAuthenticated && <UserStats />}
              <Routes>
                <Route exact path="/" element={
                  isAuthenticated ? <Navigate to="/my-photos" replace /> : <Navigate to="/login" replace />
                } />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/upload-photo" element={
                  isAuthenticated ? <PhotoUpload /> : <Navigate to="/login" replace />
                } />
                <Route path="/my-photos" element={
                  isAuthenticated ? <PhotoList /> : <Navigate to="/login" replace />
                } />
                <Route path="/rate-photos" element={
                  isAuthenticated ? <PhotoRating /> : <Navigate to="/login" replace />
                } />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Photo Rating App ©2023</Footer>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}

export default App;