import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import axios from 'axios'

import Home from './components/pages/Home'
import Dashboard from './components/pages/Dashboard'

const App = () => {
  const [loggedInStatus, setLoggedInStatus] = useState('未ログイン');
  const [user, setUser] = useState({});

  const handleLogin = (data) => {
    setLoggedInStatus('ログインなう');
    setUser(data.user);
  }

  const handleLogout = () => {
    setLoggedInStatus('未ログイン');
    setUser({});
  }

  useEffect(() => {
    checkLoginStatus();
  })

  const checkLoginStatus = () => {
    axios.get('http://localhost:3000/logged_in', { withCredentials: true })
      .then(response => {
        if (response.data.logged_in && loggedInStatus === '未ログイン') {
          setLoggedInStatus("ログインなう");
          setUser(response.data.user);
        } else if (!response.data.logged_in && loggedInStatus === 'ログインなう') {
          setLoggedInStatus('未ログイン');
          setUser({});
        }
      })
      .catch(error => {
        console.log('ログインエラー', error);
    })
  }

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route
            exact path={'/'}
            render={props => (
              <Home { ...props }
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                loggedInStatus={loggedInStatus}
              />
            )}
          />
          <Route
            exact path={'/dashboard'}
            render={props => (
              <Dashboard { ...props } loggedInStatus={loggedInStatus} />
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
