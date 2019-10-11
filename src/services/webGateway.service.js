import { authHeader } from '../helpers';
import { api } from '.'

async function getPermissions() {
    const config = {
        headers: authHeader()
    };

    const response = await api.get(`v1/web/getPermissions`, config)

    const permissions = response.data;

    return permissions;
}

async function getProfilesAndPermissions() {
    const config = {
        headers: authHeader()
    };

    const response = await api.get(`v1/web/getProfilesAndPermissions`, config)

    const profileAndPermissions = response.data;

    return profileAndPermissions;
}

export const webGatewayService = {
    getPermissions,
    getProfilesAndPermissions
};