import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

import Home from './components/pages/Home'
import Dashboard from './components/pages/Dashboard'
import SignUp from './components/auth/SignUp'
import Login from './components/auth/Login'
import Header from './components/common/Header'

const App = () => {
  const [logInStatus, setlogInStatus] = useState('×');
  const [user, setUser] = useState({});

  const handleLogin = (data) => {
    setlogInStatus('◯');
    setUser(data);
  }

  const handleLogout = () => {
    setlogInStatus('×');
    setUser({});
  }

  useEffect(() => {
    checkLoginStatus();
  }, [user]);

  const checkLoginStatus = () => {
    axios({
      method: 'get',
      url: 'http://localhost:3000/check_login_status',
      headers: {
        'access-token': Cookies.get('_access_token'),
        'client': Cookies.get('_client'),
        'uid': Cookies.get('_uid'),
      }
    })
    .then(response => {
      if (response.data.login && logInStatus === '×') {
        setlogInStatus("◯");
        setUser(response.data.user);
      } else if (!response.data.login && logInStatus === '◯') {
        setlogInStatus('×');
        setUser({});
      }
    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
    <>
      <BrowserRouter>
        <Header logInStatus={logInStatus} />
        <Switch>
          <Route exact path='/' component={Home} />

          <Route exact path='/sign_up'
            render={props => (
              <SignUp { ...props }
                handleLogin={handleLogin}
              />
            )}
          />
          <Route exact path='/login'
            render={props => (
              <Login { ...props }
                handleLogin={handleLogin}
              />
            )}
          />
          <Route
            exact path='/dashboard'
            render={props => (
              <Dashboard { ...props }
                logInStatus={logInStatus}
                handleLogout={handleLogout}
              />
            )}
          />
          <Route
            render={() => (
              <p>404 Not Found.</p>
            )}
          />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App;
