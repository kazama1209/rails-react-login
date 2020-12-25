import React, { useState } from 'react'
import axios from 'axios'

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    axios.post('http://localhost:3000/login',
      {
        user: {
            email: email,
            password: password,
        }
      },
      { withCredentials: true }
    ).then(response => {
      if (response.data.logged_in) {
        props.handleSuccessfulAuthentication(response.data);
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
