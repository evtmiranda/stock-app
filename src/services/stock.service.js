import { authHeader } from '../helpers';
import { api } from '../services'

async function get(filters) {
    try {
        const config = {
            headers: authHeader()
        };

        const response = await api.get(`v1/stocks?${filters}`, config)

        const itemsStock = response.data;

        return itemsStock;
    } catch (error) {
        return errorResponse(error)
    }
}

async function getQuantityByStatus() {
    try {
        const config = {
            headers: authHeader()
        };

        const response = await api.get(`v1/stocks/status`, config)

        return response.data;
    } catch (error) {
        return errorResponse(error)
    }
}

async function getQuantity(status) {
    try {
        const config = {
            headers: authHeader()
        };

        const response = await api.get(`v1/stocks/${status}`, config)

        return response.data;
    } catch (error) {
        return errorResponse(error)
    }
}

async function getQuantityByClient() {
    try {
        const config = {
            headers: authHeader()
        };

        const response = await api.get(`v1/stocks/client`, config)

        return response.data;
    } catch (error) {
        return errorResponse(error)
    }
}

async function getEntryAndOutQuantityByDay() {
    try {
        const config = {
            headers: authHeader()
        };

        const response = await api.get(`v1/stocks/day`, config)

        return response.data;
    } catch (error) {
        return errorResponse(error)
    }
}

async function remove(id) {
    try {
        const config = {
            headers: authHeader()
        };

        const response = await api.delete(`v1/stocks/${id}`, config)

        const rowsDeleted = response.data;

        return rowsDeleted;
    } catch (error) {
        return errorResponse(error)
    }
}

async function create(stockItem) {
    try {
        const config = {
            headers: authHeader()
        };

        const response = await api.post(`v1/stocks`, stockItem, config)

        const createdStockItem = response.data;

        return createdStockItem;
    } catch (error) {
        return errorResponse(error)
    }
}

async function update(stockItem) {
    try {
        const config = {
            headers: authHeader()
        };

        const response = await api.put(`v1/stocks/${stockItem.id}`, stockItem, config)

        const updatedStockItem = response.data;

        return updatedStockItem;
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