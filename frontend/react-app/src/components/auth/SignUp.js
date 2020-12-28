import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const SignUp = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSubmit = (event) => {
    axios({
      method: 'post',
      url: 'http://localhost:3000/auth',
      data: {
        name: name,
        email: email,
        password: password,
        password_confirmation: password,
      },
    })
    .then(response => {
      if (response.data.status === 'success') {
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
      <p>新規登録</p>

      <form onSubmit={handleSubmit}>
        <input
          type='name'
          name='name'
          placeholder='名前'
          value={name}
          onChange={event => setName(event.target.value)}
        />

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

        <input
          type='password'
          name='password_confirmation'
          placeholder='確認用パスワード'
          value={passwordConfirmation}
          onChange={event => setPasswordConfirmation(event.target.value)}
        />
        
        <button type="submit">登録</button>
      </form>
    </>
  )
}

export default SignUp;
