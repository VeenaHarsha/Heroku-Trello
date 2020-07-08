import React, { useState, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { AuthContext } from '../context/auth/AuthContext'

const NavLinks = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext)
  const [isLogout, setIsLogout] = useState(false)

  // Logout
  const onLogOut = () => {
    console.log('AM CLICKING LOGOUT...')
    logout()
    setIsLogout(true)
  }

  return isLogout ? (
    <Redirect to='/' />
  )
    : (
      <ul className='wip'>{
        isAuthenticated &&
          <>
            <li className='links-one'> Welcome {user && user.username} </li>
            <li className='links-two'>
              <a onClick={onLogOut}>
                <span>Logout</span>
              </a>
            </li>
          </>
      }
      </ul>
    )
}

export default NavLinks
