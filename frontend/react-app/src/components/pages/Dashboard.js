import React from 'react'

const Dashboard = (props) => {
  return (
    <>
      <h1>Dashboard</h1>
      <h2>ログイン状態: {props.loggedInStatus}</h2>
    </>
  );
}

export default Dashboard;
