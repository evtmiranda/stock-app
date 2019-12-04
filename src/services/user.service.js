/* eslint-disable no-undef */
import { authHeader } from '../helpers';
import { api } from '../services'
import { isUndefined } from 'util';
import { moduleService, permissionService } from './index'
import { storage } from '../utils'

async function authenticate(username, password) {
    const response = await api.get(`v1/users?username=${username}`)
    const user = response.data[0];

    if (!isUndefined(user) && user.password === password && user.profile) {
        user.authdata = window.btoa(username + ':' + password);
        localStorage.setItem('user', JSON.stringify(user));

        const filters = 'deleted_at=null';

        const permissions = await permissionService.get(filters);
        localStorage.setItem('permissions', JSON.stringify(permissions));

        const modules = await moduleService.get(filters);
        localStorage.setItem('modules', JSON.stringify(modules));

        return true;
    }

    return false;
}

function logout() {
    localStorage.removeItem('user');
}

function userHasPermission(moduleId, permissionId) {
    const user = storage.get('user')

    if (user.profile.permissions.filter(p => p.moduleId === moduleId && p.permissionId === permissionId).length > 0) {
        return true
    }

    return false
}

async function get(filters) {
    try {
        const config = {
            headers: authHeader()
        };

        const response = await api.get(`v1/users?${filters}`, config)

        const users = response.data;

        return users;
    } catch (error) {
        return errorResponse(error)
    }
}

async function remove(id) {
    try {
        const config = {
            headers: authHeader()
        };

        const response = await api.delete(`v1/users/${id}`, config)

        const rowsDeleted = response.data;

        return rowsDeleted;
    } catch (error) {
        return errorResponse(error)
    }
}

async function create(user) {
    try {
        const config = {
            headers: authHeader()
        };

        const response = await api.post(`v1/users`, user, config)

        const result = response.data;

        return result;
    } catch (error) {
        return errorResponse(error)
    }
}

async function update(user) {
    try {
        const config = {
            headers: authHeader()
        };

        const response = await api.put(`v1/users/${user.id}`, user, config)

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

export const userService = {
    authenticate,
    logout,
    get,
    remove,
    create,
    update,
    userHasPermission
};