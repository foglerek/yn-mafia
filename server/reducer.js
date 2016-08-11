import { Map, List } from 'immutable'

let defaultState = {
    state: ''
}

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'ADD_USER':
            return state.mergeDeep({
                users: List([data.user])
            })
        case 'CHANGE_STATE':
            return state.merge({
                state: action.data
            })
        case 'ADD_ROLES':
            return state.merge({
                roles: action.data
            })
        case 'SET_TIMER':
            return state.merge({
                timer: action.data
            })


    }

    return Map(state);
}
