import React from 'react'
import axios from 'axios'
import Header from '../layouts/Header'
import Registration from '../auth/Registration'
import Login from '../auth/Login'

const Home = (props) => {
  const handleSuccessfulAuthentication = (data) => {
    props.handleLogin(data);
    props.history.push('/dashboard');
  }

  const handleLogoutClick = () => {
    axios.delete('http://localhost:3000/logout', { withCredentials: true })
      .then(response => {
        props.handleLogout();
      }).catch(error => console.log('ログアウトエラー', error));
  }

  return (
    <>
      <h1>Home</h1>
      <h2>ログイン状態: {props.loggedInStatus}</h2>
      <button onClick={handleLogoutClick}>ログアウト</button>
      <Registration handleSuccessfulAuthentication={handleSuccessfulAuthentication} />
      <Login handleSuccessfulAuthentication={handleSuccessfulAuthentication} />
    </>
  );
}

export default Home;
