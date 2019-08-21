import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './pages/Login/Login.js'
import Home from './pages/Home/Home.js'
import User from './pages/User/User.js'
import Stock from './pages/Stock/Stock'
import Reports from './pages/Reports/Reports'

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/home' component={Home} />
            <Route path='/users' component={User} />
            <Route path='/stock' component={Stock} />
            <Route path='/reports' component={Reports} />
            <Route path='/logoff' component={Login} />
        </Switch>
    </BrowserRouter>
)

export default Routes