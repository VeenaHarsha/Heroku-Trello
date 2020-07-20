export default (state, action) => {
  switch (action.type) {
    case 'LOAD_USER':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      }

    case 'REGISTER':
      return {
        ...state,
        ...action.payload,
        userRegistered: true
      }

    case 'LOGIN':
      console.log('Login Success:', action.payload)
      window.localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true
      }
    case 'ERROR':
    case 'LOGOUT':
      window.localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        error: action.payload
      }
    default:
      return state
  }
}
