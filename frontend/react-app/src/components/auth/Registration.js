import React, { useState } from 'react'
import axios from 'axios'

const Registration = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSubmit = (event) => {
    axios.post('http://localhost:3000/signup',
      {
        user: {
          email: email,
          password: password,
          password_confirmation: passwordConfirmation
        }
      },
      { withCredentials: true }
    ).then(response => {
      if (response.data.status === 'created') {
        props.handleSuccessfulAuthentication(response.data);
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

export default Registration;
