import { Map, List } from 'immutable'
import {
    WAITING_FOR_PLAYERS
} from './states'

let defaultState = {
    state: WAITING_FOR_PLAYERS,
    users: List(),
    votes: List(),
    mafia_votes: List(),
    cop_votes: List()
}

let defaultUser = Map({
    socket_id: null,
    name: null,
    role: null
})

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'ADD_USER':
            return state.update(
                'users',
                list => list.push(Map(defaultUser).merge(action.user))
            )
        case 'REMOVE_USER':
            return state.update(
                'users',
                list => list.filterNot(user => user.get('socket_id') === action.socket_id)
            )
        case 'ASSIGN_ROLE':
            return state.update(
                'users',
                list => list.update(
                    list.findKey(user => user.get('socket_id') === action.socket_id),
                    (user) => {
                        user.role = action.role
                        return user
                    }
                )
            )
        case 'UPDATE_VOTES':
            let role = state.get('users').find(u => u.socket_id = action.by).get('role'),
                type = action.special ? (role === 'cop' ? 'cop_votes' : 'mafia_votes') : 'votes'

            let voteByUser = state.get(type).findKey(vote => vote.voter_id === action.by)

            if (voteByUser) {
                return state.update(
                    type,
                    votes => votes.update(
                        voteByUser,
                        vote => {
                            vote.on = action.on
                            return vote
                        }
                    )
                )
            } else {
                return state.update(
                    type,
                    votes => votes.append({
                        on: action.on,
                        by: action.by
                    })
                )
            }
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
