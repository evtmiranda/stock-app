import React, { Component } from 'react'
import { Menu } from '../../components'
import './styles.css'

export class Stock extends Component {
    render() {
        const body = (
            <h1>Estoque</h1>
        )

        return (
            <React.Fragment>
                <Menu body={body} />
            </React.Fragment>
        )
    }
}