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

async function getQuantityByStatus() {
    const config = {
        headers: authHeader()
    };

    const response = await api.get(`v1/stocks/status`, config)

    return response.data;
}

async function getQuantity(status) {
    const config = {
        headers: authHeader()
    };

    const response = await api.get(`v1/stocks/${status}`, config)

    return response.data;
}

async function getQuantityByClient() {
    const config = {
        headers: authHeader()
    };

    const response = await api.get(`v1/stocks/client`, config)

    return response.data;
}

async function getEntryAndOutQuantityByDay() {
    const config = {
        headers: authHeader()
    };

    const response = await api.get(`v1/stocks/day`, config)

    return response.data;
}

async function remove(id) {
    const config = {
        headers: authHeader()
    };

    const response = await api.delete(`v1/stocks/${id}`, config)

    const rowsDeleted = response.data;

    return rowsDeleted;
}

async function create(stockItem) {
    const config = {
        headers: authHeader()
    };

    const response = await api.post(`v1/stocks`, stockItem, config)

    const createdStockItem = response.data;

    return createdStockItem;
}

async function update(stockItem) {
    const config = {
        headers: authHeader()
    };

    const response = await api.put(`v1/stocks/${stockItem.id}`, stockItem, config)

    const updatedStockItem = response.data;

    return updatedStockItem;
}

export const stockService = {
    get,
    getQuantityByStatus,
    getQuantity,
    getQuantityByClient,
    getEntryAndOutQuantityByDay,
    remove,
    create,
    update
};