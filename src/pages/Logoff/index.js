import React, { Component } from 'react'
import { userService } from '../../services'

export class Logoff extends Component {

    componentWillMount() {
        userService.logout();
        this.props.history.push("/");
    }

    render() {
        return <div />
    }
}