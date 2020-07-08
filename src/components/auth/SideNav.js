import React from 'react'
import '../../App.css'
import { NavLink } from 'react-router-dom'

function Nav () {
  const navStyle = {
    textDecoration: 'none',
    cursor: 'pointer',
    marginBottom: '4px',
    padding: '5px',
    backgroundColor: 'rgb(149, 248, 153)',
    textAlign: 'center',
    display: 'list-item',
    color: 'black',
    fontWeight: 'bold'
  }
  return (
    <div className='home-left-sidebar'>
      <nav>
        <ul>
          <NavLink
            to='/home'
            style={navStyle}
            activeStyle={{
              background: 'yellowgreen'
            }}
          >
            Home
          </NavLink>
          <NavLink
            to='/board'
            style={navStyle}
            activeStyle={{
              background: 'yellowgreen'
            }}
          >
            Boards
          </NavLink>
          <NavLink
            to='/templates'
            style={navStyle}
            activeStyle={{
              background: 'yellowgreen'
            }}
          >
            Templates
          </NavLink>
        </ul>
      </nav>
    </div>
  )
}

export default Nav
