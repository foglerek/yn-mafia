import { Map, List } from 'immutable'
import {
    WAITING_FOR_PLAYERS
} from './states'

let defaultState = {
    state: WAITING_FOR_PLAYERS,
    users: List([])
}

let defaultUser = Map({
    socket_id: null,
    name: null,
    role: null
})

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'ADD_USER':
            return state.updateIn(
                ['users'],
                list => list.push(Map(defaultUser).merge(action.user))
            )
        case 'REMOVE_USER':
            return state.updateIn(
                ['users'],
                list => list.filterNot(user => user.get('socket_id') === action.socket_id)
            )
        case 'ASSIGN_ROLE':
            return state.updateIn(
                ['users'],
                list => list.update(
                    list.findKey(user => user.get('socket_id') === action.socket_id),
                    (user) => {
                        user.role = action.role
                        return user
                    }
                )
            )
        case 'CHANGE_STATE':
            return state.merge({
                state: action.toState
            })
        case 'ADD_ROLES':
            return state.merge({
                roles: action.data
            })
        case 'SET_TIMER':
            return state.merge({
                timer: action.seconds
            })
        default:
            return Map(state)
    }
}
