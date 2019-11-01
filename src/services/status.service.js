import { authHeader } from '../helpers';
import { api } from '../services'

async function get(filters) {
    const config = {
        headers: authHeader()
    };

    const response = await api.get(`v1/status?${filters}`, config)

    const itemsStock = response.data;

    return itemsStock;
}

export const statusService = {
    get
};