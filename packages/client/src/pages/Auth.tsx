import React, { FC } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Login from './Login'
import Register from './Register'

const Auth: FC = () => {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}/login`}>
        <Login />
      </Route>
      <Route path={`${path}/register`}>
        <Register />
      </Route>
    </Switch>
  )
}

export default Auth
