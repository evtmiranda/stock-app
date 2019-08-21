import React, { Component } from 'react'
import Menu from '../../components/Menu/Menu'
import './styles.css'

class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <Menu />
                <div class="withMenu">
                    <h1>Estoque</h1>
                </div>
            </React.Fragment>
        )
    }
}

export default Home;