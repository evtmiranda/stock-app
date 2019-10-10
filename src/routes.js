import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Login, Home, User, UserProfile, Stock, Reports, Logoff } from './pages'
import { PrivateRoute } from './components';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Login} />
            <PrivateRoute path='/home' component={Home} />
            <PrivateRoute path='/users' component={User} />
            <PrivateRoute path='/userProfiles' component={UserProfile} />
            <PrivateRoute path='/stock' component={Stock} />
            <PrivateRoute path='/reports' component={Reports} />
            <PrivateRoute path='/logoff' component={Logoff} />
        </Switch>
    </BrowserRouter>
)

export default Routes