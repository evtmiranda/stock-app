import { authHeader } from '../helpers';
import { api } from '../services'

async function get(filters) {
    const config = {
        headers: authHeader()
    };

    const response = await api.get(`v1/report?${filters}`, config)

    return response.data;
}

export const reportService = {
    get
};