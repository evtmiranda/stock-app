import { getAuthenticatedUser } from '../utils'

export function authHeader() {
    const user = getAuthenticatedUser()

    if (user && user.authdata) {
        return { 'Authorization': 'Basic ' + user.authdata };
    } else {
        return {};
    }
}