import { Map, List } from 'immutable'

let defaultState = {
    state: 'waiting_for_players'
}

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'ADD_USER':
            return state.mergeDeep({
                users: List([action.data])
            })
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
