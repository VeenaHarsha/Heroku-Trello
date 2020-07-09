import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth/AuthContext'

const NavLinks = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext)
  return (
    <ul className='wip'>{
      isAuthenticated &&
        <>
          <li className='links-one'> Welcome {user && user.username} </li>
          <li className='links-two'>
            <Link to='/' onClick={logout}>
              <span>Logout</span>
            </Link>
          </li>
        </>
    }
    </ul>
  )
}

export default NavLinks
