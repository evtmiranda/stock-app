import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './pages/Login/Login.js'
import Home from './pages/Home/Home.js'
import User from './pages/User/User.js'

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/user' component={User} />
        </Switch>
    </BrowserRouter>
)

export default Routes