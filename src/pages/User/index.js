/* eslint-disable no-undef */
import React, { Component } from 'react'
import { Menu } from '../../components'
import formatDate from '../../utils/formatDate'
import MaterialTable from "material-table";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
<<<<<<< HEAD
import CircularProgress from '@material-ui/core/CircularProgress';
import './styles.css'
import { userService, profileService } from '../../services'
import { Redirect } from 'react-router-dom'
import Create from './Create'
=======
import './styles.css';
import { userService, profileService } from '../../services';
import { Redirect } from 'react-router-dom';
import Create from './Create';
import Edit from '../../pages/User/Edit'
>>>>>>> create function edit user

export class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profilesDataTable: [],
            profiles: [],
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

    getUser(id) {
        const filters = `id=${id}`;

        let user = {};

        userService.get(filters).then(p => {
            user = p[0];
        });
        return user;
    }

    getProfile(profileId) {
        const filters = `id=${profileId}`;

        let profile = {};

        profileService.get(filters).then(p => {
            profile = p[0];
        });
        return profile;
    }

    async loadUsers() {
        const filters = 'deleted_at=null';

        const users = await userService.get(filters);

        const usersDataTable = users.map(user => ({
            ...user,
            createdAt: formatDate(user.createdAt)
        }));

        this.setState({ usersDataTable: usersDataTable });
    }

    async loadProfiles() {
        const filters = 'deleted_at=null';

        const profiles = await profileService.get(filters);

        this.setState({ profiles: profiles });
    }

    async componentDidMount() {
        await this.loadUsers();
        await this.loadProfiles();

        this.setState({ loaded: true })
    }

    async componentWillMount() {
        await this.loadProfiles();
        this.setState({ loaded: true })
    }


    async delete(rowData) {
        const { id } = rowData;

        await userService.remove(id);

        window.location.reload();
    }

    render() {
<<<<<<< HEAD
        let body = (
            <div style={{ textAlign: "center" }}>
                <CircularProgress />
            </div>
        )

        if (this.state.loaded) {
            body = (
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
                        },
                        {
                            icon: 'add',
                            tooltip: 'Adicionar Usuário',
                            isFreeAction: true,
                        }
                    ]}
                    components={{
                        Action: props => {
                            if (props.action.icon === 'add') {
                                return (
                                    <Create
                                        action={props.action}
                                        profiles={this.state.profiles}
                                    />
                                )
                            }
=======
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
                        icon: 'edit',
                        tooltip: 'Editar perfil'
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Excluir usuário',
                        onClick: (event, rowData) => this.delete(rowData)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Adicionar Usuário',
                        isFreeAction: true,
                    }
                ]}
                components={{
                    Action: props => {
                        if (props.action.icon === 'add') {
>>>>>>> create function edit user
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
<<<<<<< HEAD

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
=======
                        else if (props.action.icon === 'edit') {
                            const user = this.getUser(props.data.id);
                            const profile = this.getProfile(user.profileId);
                            console.log(profile);
                            console.log(user);
                            return (
                                <Edit
                                    action={props.action}
                                    user={user}
                                    profile={profile}
                                />
                            )
                        }
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
>>>>>>> create function edit user
                        }
                    }}
                />
            )
        }

        return (
            <React.Fragment>
                <Menu
                    body={body}
                />
            </React.Fragment>
        )
    }
}