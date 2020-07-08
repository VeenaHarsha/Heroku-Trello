
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthContextProvider } from './components/context/auth/AuthContext'
import { AppContextProvider } from './components/context/app/AppContext'

import Home from './components/pages/Home'
import Templates from './components/pages/Templates'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Board from './components/boards/Board'
import NavLinks from './components/auth/NavLinks'

export default () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <AppContextProvider>
          <div className='App'>
            <div className='header'>
              <h2>wOrK iN pRoGrEsS</h2>
              <NavLinks />
            </div>
            <div className='main-content'>
              <Switch>
                <Route exact path='/home' component={Home} />
                <Route exact path='/' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/board' component={Board} />
                <Route exact path='/templates' component={Templates} />
              </Switch>
            </div>
          </div>
        </AppContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  )
}
