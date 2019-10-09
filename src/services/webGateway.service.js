import { authHeader } from '../helpers';
import { api } from '.'

export const webGatewayService = {
    getPermissions
};

async function getPermissions() {
    const config = {
        headers: authHeader()
    };

    const response = await api.get(`v1/web/getPermissions`, config)

    const permissions = response.data;

    return permissions;
}