/* eslint-disable no-undef */
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Create from './Create'
import Edit from './Edit'
import MaterialTable from "material-table";
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { Menu } from '../../components'
import { profileService, webGatewayService } from '../../services'
import formatDate from '../../utils/formatDate'

export class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profilesDataTable: [],
            permissions: [],
            redirectToAddUser: false
        }
    }

    setRedirectToAddUser = () => {
        this.setState({
            redirectToAddUser: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirectToAddUser) {
            return <Redirect to='/home' />
        }
    }

    async loadPermissions() {
        const permissions = await webGatewayService.getPermissions();

        this.setState({
            permissions: permissions
        });
    }

    async loadProfiles() {
        const filters = 'deleted_at=null';

        const profiles = await profileService.get(filters);

        const profilesDataTable = profiles.map(profile => ({
            id: profile.id,
            name: profile.name,
            description: profile.description,
            createdAt: formatDate(profile.createdAt)
        }));

        this.setState({
            profilesDataTable: profilesDataTable
        });
    }

    async delete(rowData) {
        const { id } = rowData;

        await profileService.remove(id);

        window.location.reload();
    }

    async getProfile(id) {
        const filters = {
            id
        }

        const profile = await profileService.get(filters);

        return profile;
    }

    async componentDidMount() {
        await this.loadProfiles();
        await this.loadPermissions();
    }

    render() {
        const body = (
            <div>
                {this.renderRedirect()}
                <MaterialTable
                    title="Perfis de Usuário"
                    columns={[
                        { title: "Nome", field: "name" },
                        { title: "Descrição", field: "description" },
                        { title: "Criado em", field: "createdAt" }
                    ]}
                    data={this.state.profilesDataTable}
                    options={{
                        search: false,
                        actionsColumnIndex: -1
                    }}
                    actions={[
                        {
                            icon: 'add',
                            tooltip: 'Adicionar perfil',
                            isFreeAction: true
                        },
                        {
                            icon: 'edit',
                            tooltip: 'Editar perfil'
                        },
                        {
                            icon: 'delete',
                            tooltip: 'Excluir perfil',
                            onClick: (_event, rowData) => this.delete(rowData)
                        }
                    ]}
                    components={{
                        Action: props => {
                            if (props.action.icon === 'add') {
                                return (
                                    <Create
                                        action={props.action}
                                        permissions={this.state.permissions}
                                    />
                                )
                            }
                            else if (props.action.icon === 'edit') {
                                return (
                                    <Edit
                                        action={props.action}
                                        permissions={this.state.permissions}
                                        profile={async () => await this.getProfile(props.data.id)}
                                    />
                                )
                            }
                            else {
                                return (
                                    <Tooltip title={props.action.tooltip}>
                                        <IconButton aria-label={props.action.icon} size="small"
                                            onClick={(event) => props.action.onClick(event, props.data)}
                                        >
                                            <Icon>{props.action.icon}</Icon>
                                        </IconButton>
                                    </Tooltip>
                                )
                            }
                        }
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
            </div>
        )

        return (
            <React.Fragment>
                <Menu body={body} />
            </React.Fragment>
        )
    }
}