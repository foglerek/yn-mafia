import { Map, List } from 'immutable'
import {
    WAITING_FOR_PLAYERS
} from './states'

let defaultState = {
    state: WAITING_FOR_PLAYERS
}

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'ADD_USER':
            return state.updateIn(
                ['users'],
                seq => seq ? seq.push(action.user) : List([action.user])
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


    }

    return Map(state);
}
