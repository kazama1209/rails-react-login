import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return(
    <>
      <Link to="/">Home</Link>
      <Link to='/dashboard'>ダッシュボード</Link>
    </>
  )
}

export default Header;
