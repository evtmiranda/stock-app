import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Create from './Create'
import MaterialTable from "material-table";
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { Menu } from '../../components'
import { profileService } from '../../services'
import formatDate from '../../utils/formatDate'

export class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profilesDataTable: [],
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

    async componentDidMount() {
        await this.loadProfiles();
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

        this.setState({ profilesDataTable: profilesDataTable });
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
                    actions={[
                        {
                            icon: 'add',
                            tooltip: 'Adicionar perfil',
                            isFreeAction: true,
                        }
                    ]}
                    components={{
                        Action: props => {
                            if (props.action.icon === 'add') {
                                return (
                                    <Create action={props.action} />
                                )
                            }
                            else {
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