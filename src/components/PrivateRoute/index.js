/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { storage } from '../../utils'

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        storage.get('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
)