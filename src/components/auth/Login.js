import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../context/auth/AuthContext'
import { Link, Redirect } from 'react-router-dom'

function Login () {
  const { token, login, error, isAuthenticated } = useContext(AuthContext)

  const [isLogin, setIsLogin] = useState(false)
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  useEffect(() => {
    token && setIsLogin(true)
  }, [])
  const { email, password } = user

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

  const loginTrello = async e => {
    e.preventDefault()
    login({
      email,
      password
    })
    setIsLogin(true)
    setUser({
      email: '',
      password: ''
    })
  }

  return (isLogin && isAuthenticated) ? (
    <Redirect to='/home' />
  )
    : (
      <div className='login-container'>
        <form className='user-login-form' onSubmit={loginTrello}>
          {error && <h3 className='login-error'>{error.message}</h3>}
          <p className='login-text'> Login Please!</p>
          <input
            type='text'
            className='login-input'
            placeholder='Enter Email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
          <input
            type='password'
            autoComplete='new-password'
            className='login-input'
            placeholder='Enter Password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
          <button
            type='submit'
            className='login-button'
          >
              Login
          </button>
        </form>
        <p className='footer-text'>
            Don't have an account. <Link to='/register'>Register New User</Link>
        </p>
      </div>
    )
}
export default Login
