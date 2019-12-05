import { storage } from '../utils'

export function authHeader() {
    const userToken = storage.get('userToken')

    if (userToken) {
        return { 'Authorization': 'Bearer ' + userToken };
    } else {
        return {};
    }
}