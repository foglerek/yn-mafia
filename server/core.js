import shuffle from 'lodash/shuffle'

export function genRoles(numUsers) {
    let roles = []

    if (numUsers < 9) {
        roles.push('mafia')
    }
    if (numUsers < 13) {
        roles.push('mafia')
        roles.push('cop')
    }
    if (numUsers < 18) {
        roles.push('mafia')
        roles.push('cop')
    }
    if (numUsers >= 18) {
        roles.push('mafia')
    }

    roles.concat(Array(numUsers - roles.length).fill('villager'))
    return _.shuffle(roles)
}
