import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import ForgotPassword from './components/Auth/ForgotPassword';
import PhotoUpload from './components/PhotoUpload';
import PhotoList from './components/PhotoList';
import PhotoRating from './components/PhotoRating';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <nav>
            <ul>
              <li><Link to="/register">Регистрация</Link></li>
              <li><Link to="/login">Вход</Link></li>
              <li><Link to="/forgot-password">Забыли пароль?</Link></li>
              <li><Link to="/upload-photo">Загрузить фото</Link></li>
              <li><Link to="/my-photos">Мои фотографии</Link></li>
              <li><Link to="/rate-photos">Оценка фотографий</Link></li>
            </ul>
          </nav>

          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/upload-photo" component={PhotoUpload} />
            <Route path="/my-photos" component={PhotoList} />
            <Route path="/rate-photos" component={PhotoRating} />
          </Switch>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;