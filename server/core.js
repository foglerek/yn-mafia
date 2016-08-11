import shuffle from 'lodash/shuffle'

export function genRoles(numUsers) {
    let roles = []

    if (numUsers > 5) {
        roles.push('mafia')
    }
    if (numUsers > 8) {
        roles.push('mafia')
        roles.push('cop')
    }
    if (numUsers > 12) {
        roles.push('mafia')
        roles.push('cop')
    }
    if (numUsers >= 18) {
        roles.push('mafia')
    }

    roles = roles.concat(Array(numUsers - roles.length).fill('villager'))
    return shuffle(roles)
}
