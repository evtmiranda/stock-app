import { authHeader } from '../helpers';
import { api } from '../services'

async function get(filters) {
    const config = {
        headers: authHeader()
    };

    const response = await api.get(`v1/stocks?${filters}`, config)

    const itemsStock = response.data;

    return itemsStock;
}

async function remove(id) {
    const config = {
        headers: authHeader()
    };

    const response = await api.delete(`v1/stocks/${id}`, config)

    const rowsDeleted = response.data;

    return rowsDeleted;
}

export const stockService = {
    get,
    remove
};