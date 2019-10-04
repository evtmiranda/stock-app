import { authHeader } from '../helpers';
import { api } from '../services'
import { isUndefined } from 'util';

export const userService = {
    authenticate,
    logout,
    get,
    remove
};

async function authenticate(username, password) {
    const response = await api.get(`v1/users?username=${username}`)
    const user = response.data[0];

    if (!isUndefined(user) && user.password === password) {
        user.authdata = window.btoa(username + ':' + password);
        localStorage.setItem('user', JSON.stringify(user));

        return true;
    }

    return false;
}

function logout() {
    localStorage.removeItem('user');
}

async function get(filters) {
    const config = {
        headers: authHeader()
    };

    const response = await api.get(`v1/users?${filters}`, config)

    const users = response.data;

    return users;
}

async function remove(id) {
    const config = {
        headers: authHeader()
    };

    const response = await api.delete(`v1/users/${id}`, config)

    const rowsDeleted = response.data;

    return rowsDeleted;
}