import { authHeader } from '../helpers';
import { api } from '../services'

async function get(filters) {
    const config = {
        headers: authHeader()
    };

    const response = await api.get(`v1/permissions?${filters}`, config)

    const permissions = response.data;

    return permissions;
}

export const permissionService = {
    get
};