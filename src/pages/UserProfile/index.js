/* eslint-disable no-undef */
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Create from './Create'
import Edit from './Edit'
import Table from "../../components/Table";
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Menu } from '../../components'
import { profileService, webGatewayService } from '../../services'
import { formatDate, makeActions } from '../../utils'

export class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profilesDataTable: [],
            profilesAndPermissions: [],
            permissions: [],
            redirectToAddUser: false,
            loaded: false
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

    async loadProfilesAndPermissions() {
        const profilesAndPermissions = await webGatewayService.getProfilesAndPermissions();

        this.setState({
            profilesAndPermissions: profilesAndPermissions
        });
    }

    getProfile(id) {
        const profileAndPermission = this.state.profilesAndPermissions.filter(p => p.id === id);

        return profileAndPermission.length > 0 ? profileAndPermission[0] : profileAndPermission;
    }

    async componentWillMount() {
        await this.loadProfiles();
        await this.loadPermissions();
        await this.loadProfilesAndPermissions();

        this.setState({ loaded: true })
    }

    render() {
        let body = (
            <div style={{ textAlign: "center" }}>
                <CircularProgress />
            </div>
        )

        if (this.state.loaded) {
            body = (
                <div>
                    {this.renderRedirect()}
                    <Table
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
                        actions={makeActions('userProfiles', {
                            create: {
                                icon: 'add',
                                tooltip: 'Adicionar perfil',
                                isFreeAction: true
                            },
                            edit: {
                                icon: 'edit',
                                tooltip: 'Editar perfil'
                            },
                            delete: {
                                icon: 'delete',
                                tooltip: 'Excluir perfil',
                                onClick: (_event, rowData) => this.delete(rowData)
                            }
                        })}
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
                                    const profile = this.getProfile(props.data.id);
                                    return (
                                        <Edit
                                            action={props.action}
                                            permissions={this.state.permissions}
                                            profile={profile}
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
                    />
                </div>
            )
        }

        return (
            <React.Fragment>
                <Menu body={body} />
            </React.Fragment>
        )
    }
}