// import config from 'config';
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
    const response = await api.get(`v1/users?deleted=false&username=${username}`)
    const user = response.data[0];

    if (!isUndefined(user) && user.password === password) {
        user.authdata = window.btoa(username + ':' + password);
        localStorage.setItem('user', JSON.stringify(user));

        return true;
    }

    return false;
}

function logout() {
    // remove user from local storage to log user out
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

// function get() {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
// }

// function handleResponse(response) {
//     return response.text().then(text => {
//         const data = text && JSON.parse(text);
//         if (!response.ok) {
//             if (response.status === 401) {
//                 // auto logout if 401 response returned from api
//                 logout();
//                 location.reload(true);
//             }

//             const error = (data && data.message) || response.statusText;
//             return Promise.reject(error);
//         }

//         return data;
//     });
// }