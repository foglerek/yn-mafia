import { Map, List } from 'immutable'

let defaultState = {
    state: ''
}

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'ADD_USER':
            return state.mergeDeep({
                state: 'waiting_for_players',
                users: List([data.user])
            })
    }

    return Map(state);
}
