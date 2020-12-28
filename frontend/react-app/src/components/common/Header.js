import React from 'react'
import { Link } from 'react-router-dom'

const Header = (props) => {
  return(
    <>
      {
        props.logInStatus === '×' ?
          (
            <>
              <li><Link to='sign_up'>Sign Up</Link></li>
              <li><Link to='login'>Login</Link></li>
            </>
          ) :
          (
            <>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='dashboard'>Dashboard</Link></li>
            </>
          )
      }
    </>
  )
}

export default Header;
