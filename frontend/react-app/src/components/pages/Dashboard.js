import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const Dashboard = (props) => {
  const handleLogoutClick = () => {
    axios({
      method: 'delete',
      url: 'http://localhost:3000/auth/sign_out',
      headers: {
        'access-token': Cookies.get('_access_token'),
        'client': Cookies.get('_client'),
        'uid': Cookies.get('_uid'),
      }
    })
    .then(response => {
      if (response.data.success === true ) {
        Cookies.remove('_access_token');
        Cookies.remove('_client');
        Cookies.remove('_uid');

        props.handleLogout();
        props.history.push('/');
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={handleLogoutClick}>ログアウト</button>
    </>
  );
}

export default Dashboard;
