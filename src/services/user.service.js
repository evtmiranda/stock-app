/* eslint-disable no-undef */
import { authHeader } from '../helpers';
import { api } from '../services'
import { isUndefined } from 'util';

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

async function create(user) {
    const config = {
        headers: authHeader()
    };

    const response = await api.post(`v1/users`, user, config)

    const result = response.data;

    return result;
}

async function update(user) {
    const config = {
        headers: authHeader()
    };

    const response = await api.put(`v1/users/${user.id}`, user, config)

    const rowsUpdated = response.data;

    return rowsUpdated;
}

export const userService = {
    authenticate,
    logout,
    get,
    remove,
    create,
    update
};