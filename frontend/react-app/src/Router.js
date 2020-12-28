import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import Dashboard from './components/pages/Dashboard'
import Registration from './components/auth/Registration'
import Login from './components/auth/Login'

const Routes = (prop) => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/registration" component={Registration} />

          <Route
            exact path={'/'}
            render={props => (
              <Home { ...props }
                handleLogin={prop.handleLogin}
                handleLogout={prop.handleLogout}
                loggedInStatus={prop.loggedInStatus}
              />
            )}
          />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route render={() => (<p>404 Not Found.</p>)} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default Routes;
