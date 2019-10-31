import { storage } from '../utils'

export function authHeader() {
    const user = storage.get('user')

    if (user && user.authdata) {
        return { 'Authorization': 'Basic ' + user.authdata };
    } else {
        return {};
    }
}