import { Map, List } from 'immutable'
import {
    WAITING_FOR_PLAYERS
} from './states'

let defaultState = {
    state: WAITING_FOR_PLAYERS,
    users: List(),
    votes: List(),
    mafia_votes: List(),
    cop_votes: List(),
    result: null,
    winner: null
}

let defaultUser = Map({
    socket_id: null,
    name: null,
    role: null,
    alive: true
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
            let statetest = state.update(
                'users',
                list => list.map(
                    user => {
                        if (user.get('socket_id') === action.socket_id) {
                            return user.set('role', action.role)
                        }
                        return user
                    }
                )
            )
            console.log(statetest)
            return statetest
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
        case 'RELEASE_ROUND_RESULT':
            return state
                .update('result', action.result)
                .update('users', users => users.map(u => {
                    let gotDead = [action.result.votedOut, action.result.killed].includes(u.get('socket_id'))
                    return u.set('alive', !gotDead)
                }))
        case 'SET_WINNER':
            return state.update('winner', action.team)
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
