import React, { Component } from 'react'
import { Menu } from '../../components'
import formatDate from '../../utils/formatDate'
import MaterialTable from "material-table";
import './styles.css'
import { userService } from '../../services'

export class User extends Component {
    state = {
        usersDataTable: []
    }

    async loadUsers() {
        const filters = `deleted=false`;

        const users = await userService.get(filters);
        const usersDataTable = users.map(user => ({ name: user.name, createdAt: formatDate(user.createdAt) }));

        this.setState({ usersDataTable: usersDataTable });
    }

    async componentDidMount() {
        await this.loadUsers();
    }

    render() {
        const body = (
            <MaterialTable
                columns={[
                    { title: "Nome", field: "name" },
                    { title: "Criado em", field: "createdAt" }
                ]}
                data={this.state.usersDataTable}
                title="Usuários"
            />
        )

        return (
            <React.Fragment>
                <Menu
                    body={body}
                />
            </React.Fragment>
        )
    }
}