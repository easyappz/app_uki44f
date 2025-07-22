import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import ErrorBoundary from './ErrorBoundary';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import ForgotPassword from './components/Auth/ForgotPassword';
import PhotoUpload from './components/PhotoUpload';
import PhotoList from './components/PhotoList';
import PhotoRating from './components/PhotoRating';
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
              <Switch>
                <Route exact path="/" render={() => (
                  isAuthenticated ? <Redirect to="/my-photos" /> : <Redirect to="/login" />
                )} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <PrivateRoute path="/upload-photo" component={PhotoUpload} />
                <PrivateRoute path="/my-photos" component={PhotoList} />
                <PrivateRoute path="/rate-photos" component={PhotoRating} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Photo Rating App ©2023</Footer>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default App;