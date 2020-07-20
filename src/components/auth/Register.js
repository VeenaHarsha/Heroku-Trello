import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/auth/AuthContext'
import { Link, Redirect } from 'react-router-dom'

function Register () {
  const { error, register, userRegistered } = useContext(AuthContext)
  const [isReg, setIsReg] = useState(false)
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  })

  const { username, email, password, password2 } = user

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

  const registerTrello = async e => {
    e.preventDefault()
    register({
      username,
      email,
      password
    })
    setIsReg(true)
    setUser({
      username: '',
      email: '',
      password: '',
      password2: ''
    })
  }

  return (isReg && userRegistered)
    ? (<Redirect to='/' />)
    : (<div className='register-container'>
      <form className='user-reg-form' onSubmit={registerTrello}>
        {error && <h3 className='login-error'>{error.message}</h3>}
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='username'
            value={username}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
        <button
          type='submit'
          className='login-button'
        >
            Register
        </button>
      </form>
      <p className='footer-text'>
          Already Registered. <Link to='/'>Login with Account Details</Link>
      </p>
     </div>)
}

export default Register
