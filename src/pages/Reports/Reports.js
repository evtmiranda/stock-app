import React, { Component } from 'react'
import Menu from '../../components/Menu/Menu'
import './styles.css'

class Home extends Component {
    render() {
        const body = (
            <h1>Relatórios</h1>
        )
        
        return (
            <React.Fragment>
                <Menu body={body} />
            </React.Fragment>
        )
    }
}

export default Home;