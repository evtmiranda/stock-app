import { authHeader } from '../helpers';
import { api } from '../services'

export const profileService = {
    get
};

async function get(filters) {
    const config = {
        headers: authHeader()
    };

    const response = await api.get(`v1/profiles?${filters}`, config)

    const profiles = response.data;

    return profiles;
}