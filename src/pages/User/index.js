/* eslint-disable no-undef */
import React, { Component } from 'react'
import { Menu } from '../../components'
import formatDate from '../../utils/formatDate'
import Table from "../../components/Table";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import CircularProgress from '@material-ui/core/CircularProgress';
import './styles.css'
import { userService, profileService } from '../../services'
import { Redirect } from 'react-router-dom'
import Create from './Create'
import Edit from './Edit'
import { isNullOrUndefined } from 'util';
import { makeActions } from '../../utils';

export class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            profiles: [],
            redirectToAddUser: false,
            loaded: false,
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

    async loadProfiles() {
        const filters = 'deleted_at=null';

        const profiles = await profileService.get(filters);

        this.setState({
            profiles: profiles
        });
    }

    getUser(id) {
        const user = this.state.users.filter(p => p.id === id);

        return user.length > 0 ? user[0] : user;
    }

    getProfile(profileId) {
        const profile = this.state.profiles.filter(p => p.id === profileId);

        return profile.length > 0 ? profile[0] : profile;
    }

    async loadUsers() {
        const filters = 'deleted_at=null';

        const users = await userService.get(filters);

        const usersMap = users.map(user => ({
            ...user,
            createdAt: formatDate(user.createdAt)
        }));

        this.setState({ users: usersMap });
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
        let body = (
            <div style={{ textAlign: "center" }}>
                <CircularProgress />
            </div>
        )

        if (this.state.loaded) {
            body = (
                <Table
                    title="Usuários"
                    columns={[
                        { title: "Nome", field: "name" },
                        { title: "Criado em", field: "createdAt" }
                    ]}
                    data={this.state.users}
                    actions={makeActions('users', {
                        create: {
                            icon: 'add',
                            tooltip: 'Adicionar usuário',
                            isFreeAction: true,
                        },
                        edit: {
                            icon: 'edit',
                            tooltip: 'Editar usuário'
                        },
                        delete: {
                            icon: 'delete',
                            tooltip: 'Excluir usuário',
                            onClick: (event, rowData) => this.delete(rowData)
                        }
                    })}
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
                            else if (props.action.icon === 'edit' && !isNullOrUndefined(props.data.id)) {
                                const user = this.getUser(props.data.id)
                                const profile = this.getProfile(user.profileId);

                                return (
                                    <Edit
                                        action={props.action}
                                        user={user}
                                        profile={profile}
                                        profiles={this.state.profiles}
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

                    }
                    }
                    options={{
                        actionsColumnIndex: -1,
                        search: false
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