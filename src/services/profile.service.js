import { authHeader } from '../helpers';
import { api } from '../services'

async function get(filters) {
    try {
        const config = {
            headers: authHeader()
        };

        const response = await api.get(`v1/profiles?${filters}`, config)

        const profiles = response.data;

        return profiles;
    } catch (error) {
        return errorResponse(error)
    }
}

async function create(profile) {
    try {
        const config = {
            headers: authHeader()
        };

        const response = await api.post(`v1/profiles`, profile, config)

        const createdProfile = response.data;

        return createdProfile;
    } catch (error) {
        return errorResponse(error)
    }
}

async function remove(id) {
    try {
        const config = {
            headers: authHeader()
        };

        const response = await api.delete(`v1/profiles/${id}`, config)

        const rowsDeleted = response.data;

        return rowsDeleted;
    } catch (error) {
        return errorResponse(error)
    }
}

async function update(profile) {
    try {
        const config = {
            headers: authHeader()
        };

        const response = await api.put(`v1/profiles/${profile.id}`, profile, config)

        const rowsUpdated = response.data;

        return rowsUpdated;
    } catch (error) {
        return errorResponse(error)
    }
}

function errorResponse(error) {
    if (error.response) {
        return error.response.data
    }
    else {
        return {
            errors: [
                {
                    erro: "Oops, ocorreu algo inesperado, por favor, tente novamente"
                }
            ]
        }
    }
}

export const profileService = {
    get,
    create,
    remove,
    update
};