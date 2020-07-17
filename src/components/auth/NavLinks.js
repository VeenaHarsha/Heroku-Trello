import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth/AuthContext'
import { AppContext } from '../context/app/AppContext'

function NavLinks () {
  const { isAuthenticated, user, logout } = useContext(AuthContext)
  const { resetState } = useContext(AppContext)

  const signOff = () => {
    resetState()
    logout()
  }
  return (
    <ul className='wip'>{
      isAuthenticated &&
        <>
          <li className='links-one'> Welcome {user && user.username} </li>
          <li className='links-two'>
            <Link to='/' onClick={signOff}>
              <span>Logout</span>
            </Link>
          </li>
        </>
    }
    </ul>
  )
}

export default NavLinks
