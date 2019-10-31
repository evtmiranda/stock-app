import { authHeader } from '../helpers';
import { api } from '../services'

async function get(filters) {
    const config = {
        headers: authHeader()
    };

    const response = await api.get(`v1/modules?${filters}`, config)

    const modules = response.data;

    return modules;
}

export const moduleService = {
    get
};