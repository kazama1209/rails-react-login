import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    axios({
      method: 'post',
      url: 'http://localhost:3000/auth/sign_in',
      data: {
        email: email,
        password: password,
      },
    })
    .then(response => {
      if (response.status === 200) {
        Cookies.set('_access_token', response.headers['access-token']);
        Cookies.set('_client', response.headers['client']);
        Cookies.set('_uid', response.headers['uid']);

        props.handleLogin(response.data);
        props.history.push('/dashboard');
      }
    }).catch(error => {
      console.log(error);
    })
    event.preventDefault();
  }

  return (
    <>
      <p>ログイン</p>

      <form onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          placeholder='メールアドレス'
          value={email}
          onChange={event => setEmail(event.target.value)}
        />

        <input
          type='password'
          name='password'
          placeholder='パスワード'
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        
        <button type="submit">ログイン</button>
      </form>
    </>
  )
}

export default Login;
