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
        const filters = 'deleted_at=null';

        const users = await userService.get(filters);

        const usersDataTable = users.map(user => ({
            id: user.id,
            name: user.name,
            createdAt: formatDate(user.createdAt)
        }));

        this.setState({ usersDataTable: usersDataTable });
    }

    async componentDidMount() {
        await this.loadUsers();
    }

    async delete(rowData) {
        const { id } = rowData;

        await userService.remove(id);
    }

    render() {
        const body = (
            <MaterialTable
                title="Usuários"
                columns={[
                    { title: "Nome", field: "name" },
                    { title: "Criado em", field: "createdAt" }
                ]}
                data={this.state.usersDataTable}
                actions={[
                    {
                        icon: 'delete',
                        tooltip: 'Apagar usuário',
                        onClick: (event, rowData) => this.delete(rowData)
                    }
                ]}
                options={{
                    actionsColumnIndex: -1
                }}
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