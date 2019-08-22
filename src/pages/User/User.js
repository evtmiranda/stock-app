import React, { Component } from 'react'
import Menu from '../../components/Menu/Menu'
import formatDate from '../../utils/formatDate'
import MaterialTable from "material-table";
import './styles.css'
import api from '../../services/api'

class User extends Component {
    state = {
        usersDataTable: []
    }

    async loadUsers(page = 1) {
        const response = await api.get(`v1/user?page=${page}`)

        const users = response.data;
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

export default User;