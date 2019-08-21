import React, { Component } from 'react'
import Menu from '../../components/Menu/Menu'
import './styles.css'

class User extends Component {
    render() {
        return (
            <React.Fragment>
                <Menu />
                <div class="withMenu">
                    <h1>Usuários</h1>
                </div>
            </React.Fragment>
        )
    }
}

export default User;