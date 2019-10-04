import React, { Component } from 'react'
import { Menu } from '../../components'
import MaterialTable from "material-table";
import { profileService } from '../../services'
import formatDate from '../../utils/formatDate'

export class UserProfile extends Component {
    state = {
        profilesDataTable: []
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
                        onClick: (event) => alert("You want to add a new row")
                    }
                ]}
            />
        )

        return (
            <React.Fragment>
                <Menu body={body} />
            </React.Fragment>
        )
    }
}