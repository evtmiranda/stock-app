/* eslint-disable no-undef */
function get(key) {
    return JSON.parse(localStorage.getItem(key))
}

function getSubItem(key, subKey, subKeyValue) {
    const object = JSON.parse(localStorage.getItem(key))

    const filtered = object.filter(p => p[subKey] === subKeyValue)

    return filtered.length > 0 ? filtered[0] : filtered
}

export const storage = {
    get,
    getSubItem
}