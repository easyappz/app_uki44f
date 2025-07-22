import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import ForgotPassword from './components/Auth/ForgotPassword';
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
            </ul>
          </nav>

          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;