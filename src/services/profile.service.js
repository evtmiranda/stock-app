import { authHeader } from '../helpers';
import { api } from '../services'

async function get(filters) {
    const config = {
        headers: authHeader()
    };

    const response = await api.get(`v1/profiles?${filters}`, config)

    const profiles = response.data;

    return profiles;
}

async function create(profile) {
    const config = {
        headers: authHeader()
    };

    const response = await api.post(`v1/profiles`, profile, config)

    const createdProfile = response.data;

    return createdProfile;
}

async function remove(id) {
    const config = {
        headers: authHeader()
    };

    const response = await api.delete(`v1/profiles/${id}`, config)

    const rowsDeleted = response.data;

    return rowsDeleted;
}

export const profileService = {
    get,
    create,
    remove
};