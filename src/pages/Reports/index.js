import React, { Component } from 'react'
import { Menu } from '../../components'
import './styles.css'

export class Reports extends Component {
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