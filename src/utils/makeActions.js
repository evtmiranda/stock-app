import { storage } from '../utils'
import { userService } from '../services'

function translateAction(action) {
    switch (action) {
        case "add":
            return "create"
        default:
            return action
    }
}

export default (moduleName, actionsObject) => {
    let actions = []
    let permission = {}
    let hasPermission = false
    const module = storage.getSubItem('modules', 'name', moduleName)

    Object.keys(actionsObject).forEach(key => {
        permission = storage.getSubItem('permissions', 'name', translateAction(key))
        hasPermission = userService.userHasPermission(module.id, permission.id)

        if (hasPermission) {
            actions.push(actionsObject[key])
        }
    })

    return actions;
}