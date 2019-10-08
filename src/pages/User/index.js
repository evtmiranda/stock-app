import React, { Component } from 'react'
import { Menu } from '../../components'
import formatDate from '../../utils/formatDate'
import MaterialTable from "material-table";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
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
                        tooltip: 'Excluir usuário',
                        onClick: (event, rowData) => this.delete(rowData)
                    }
                ]}
                components={{
                    Action: props => {
                        return (
                            <Tooltip title={props.action.tooltip}>
                                <IconButton aria-label={props.action.icon} size="small"
                                    onClick={props.action.onClick}
                                >
                                    <Icon>{props.action.icon}</Icon>
                                </IconButton>
                            </Tooltip>
                        )
                    }

                }}
                options={{
                    actionsColumnIndex: -1,
                    search: false
                }}
                localization={{
                    pagination: {
                        labelDisplayedRows: '{from}-{to} de {count}',
                        labelRowsSelect: 'linhas'
                    },
                    toolbar: {
                        nRowsSelected: '{0} linha(s) selecionadas',

                    },
                    header: {
                        actions: 'Ações'
                    },
                    body: {
                        emptyDataSourceMessage: 'Sem informações',
                        filterRow: {
                            filterTooltip: 'Filter'
                        }
                    }
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