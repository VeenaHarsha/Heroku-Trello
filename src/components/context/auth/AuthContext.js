import React, { createContext, useReducer } from 'react'
import AuthReducer from './AuthReducer'

const initialState = {
  token: window.localStorage.getItem('token'),
  isAuthenticated: null,
  user: null,
  error: null
}
export const AuthContext = createContext()

export const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState)

  const loadUser = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'x-auth-token': window.localStorage.getItem('token')
      }
    }
    try {
      const response = await window.fetch('http://trello-clone-wip.herokuapp.com/trello/auth/user', options)

      const data = await response.json()
      dispatch({
        type: 'LOAD_USER',
        payload: data
      })
    } catch (err) {
      dispatch({ type: 'ERROR' })
    }
  }

  const register = async (formData) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }
    console.log('FORM DATA:', formData)
    try {
      const response = await window.fetch('http://trello-clone-wip.herokuapp.com/trello/users/register/', options)
      const data = await response.json()
      if (data.token) {
        dispatch({
          type: 'REGISTER',
          payload: data
        })
        loadUser()
      } else {
        dispatch({
          type: 'ERROR',
          payload: data
        })
      }
    } catch (err) {
      console.log('ERROR', err)
    }
  }

  const login = async (formData) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }
    try {
      const response = await window.fetch('http://trello-clone-wip.herokuapp.com/trello/auth/', options)
      const data = await response.json()
      if (data.token) {
        dispatch({ type: 'LOGIN', payload: data })
        loadUser()
      } else {
        dispatch({
          type: 'ERROR',
          payload: data
        })
      }
    } catch (err) {
      console.log('ERROR', err)
    }
  }
  // Logout
  const logout = () => {
    dispatch({ type: 'LOGOUT' })
  }
  return (
    <AuthContext.Provider value={{
      token: state.token,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      error: state.error,
      login: login,
      logout: logout,
      register: register,
      loadUser: loadUser
    }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
