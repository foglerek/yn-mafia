import { Map, List } from 'immutable'
import {
    WAITING_FOR_PLAYERS,
    READY_TO_START,
    ANNOUNCE_ROLES,
    INITIAL_COUNTDOWN,
    DISCUSSION,
    TIME_UP,
    ROUND_RESULT,
    GAME_RESULT
} from './states'
import {
    MIN_PLAYERS
} from './config'
import { genRoles } from './core'
import { determineMafiaKill, determineCopIdentified, determineVotedOut } from './vote'

export function userConnected(socket) {
    return (dispatch, getState) => {
        let state = getState();
        socket.emit('state', state.toJS())
        return state
    }
}

export function userDisconnected(socket) {
    return (dispatch, getState) => {
        dispatch(leaveGame(socket.id))
    }
}

export function joinGame(data, socketId) {
    return (dispatch, getState) => {
        let state = getState()
        if ([WAITING_FOR_PLAYERS, READY_TO_START].includes(state.get('state'))) {
            let userExists = state.get('users').some(
                (user) => {
                    return user.get('socket_id') === socketId
                }
            )
            if (userExists) {
                return state
            } else {
                data.socket_id = socketId
                dispatch(addUser(data))
                dispatch(playerJoined())
            }
        } else {
            return state
        }
    }
}

export function leaveGame(socketId) {
    return (dispatch, getState) => {
        dispatch(removeUser(socketId))
        dispatch(playerLeft())
    }
}

export function startGame() {
    return (dispatch, getState) => {
        // Calculate Roles
        let state = getState(),
            numUsers = state.get('users').count(),
            roles = genRoles(numUsers)

        console.log(roles)

        state.get('users').map(user => {
            dispatch(assignRole(user.get('socket_id'), roles.pop()))
        })
        dispatch(changeState(ANNOUNCE_ROLES))
        dispatch(setTimer(15))
    }
}

export function startRound() {
    return (dispatch, getState) => {
        dispatch(changeState(INITIAL_COUNTDOWN))
        dispatch(startTimer(10))
    }
}

export function endGame(winner) {
    return (dispatch, getState) => {
        dispatch(changeState(GAME_RESULT))
        dispatch(setWinner(winner))
    }
}

export function beginDiscussion() {
    return (dispatch, getState) => {
        dispatch(changeState(DISCUSSION))
        dispatch(startTimer(90))
    }
}

export function roundResult() {
    return (dispatch, getState) => {
        dispatch(calculateRoundResult())
        dispatch(changeState(ROUND_RESULT))
        dispatch(startTimer(30))
    }
}

export function handleRoundEnd() {
    return (dispatch, getState) => {
        let state = getState(),
            roleCounts = state.get('users')
                .filter(u => u.get('alive'))
                .countBy(u => u.get('role'))

        console.log(roleCounts)
        if (!roleCounts['mafia']) {
            dispatch(endGame('villager'))
        } else if (roleCounts['mafia'] >= roleCounts['villager']) {
            dispatch(endGame('mafia'))
        } else {
            dispatch(startRound())
        }
    }
}

export function calculateRoundResult() {
    return (dispatch, getState) => {
        let state = getState(),
            votedOut = determineVotedOut(state.get('votes')),
            identified = determineCopIdentified(state.get('cop_votes'), state.get('users'), votedOut),
            killed = determineMafiaKill(state.get('mafia_votes'), votedOut)

        dispatch({
            type: 'RELEASE_ROUND_RESULT',
            result: {
                votedOut,
                killed,
                identified
            }
        })
    }
}

export function playerJoined() {
    return (dispatch, getState) => {
        let state = getState()
        if (state.get('users').count() >= MIN_PLAYERS) {
            dispatch(changeState(READY_TO_START))
        } else {
            return state
        }
    }
}

export function playerLeft() {
    return (dispatch, getState) => {
        let state = getState()
        if (state.get('users').count() < MIN_PLAYERS) {
            dispatch(changeState(WAITING_FOR_PLAYERS))
        } else {
            return state
        }
    }
}

export function voteUser(by, on) {
    return (dispatch, getState) => {
        let state = getState()
        if (state.get('state') === DISCUSSION) {
            dispatch(updateVotes(by, on))
        } else {
            return state
        }
    }
}

export function specialVoteUser(by, on) {
    return (dispatch, getState) => {
        let state = getState()
        if (state.get('state') === DISCUSSION) {
            dispatch(updateVotes(by, on, true))
        } else {
            return state
        }
    }
}

export function startTimer(seconds) {
    return (dispatch, getState) => {
        dispatch(setTimer(seconds))
        let ticker = setInterval(() => {
            let timer = getState().get('timer')
            if (!timer) {
                clearInterval(ticker)
                dispatch(timeUp())
            } else {
                dispatch(setTimer(--timer))
            }
        }, 1000)
    }
}

export function timeUp() {
    return (dispatch, getState) => {
        let state = getState().get('state')
        switch (state) {
            case ANNOUNCE_ROLES:
                dispatch(startRound())
            case INITIAL_COUNTDOWN:
                dispatch(beginDiscussion())
            case DISCUSSION:
                dispatch(changeState('time_up'))
                dispatch(setTimer(10))
            case TIME_UP:
                dispatch(roundResult())
            case ROUND_RESULT:
                dispatch(handleRoundEnd())
        }
    }
}

export function setTimer(seconds) {
    return {
        type: 'SET_TIMER',
        seconds
    }
}

export function updateVotes(by, on, special = false) {
    return {
        type: 'UPDATE_VOTES',
        by,
        on,
        special
    }
}

export function addUser(user) {
    return {
        type: 'ADD_USER',
        user
    }
}

export function removeUser(socketId) {
    return {
        type: 'REMOVE_USER',
        socket_id: socketId
    }
}

export function assignRole(socket_id, role) {
    return {
        type: 'ASSIGN_ROLE',
        socket_id,
        role
    }
}

export function setWinner(team) {
    return {
        type: 'SET_WINNER',
        team
    }
}

export function changeState(toState) {
    return (dispatch, getState) => {
        let fromState = getState().get('state')
        dispatch(handleStateChange(fromState, toState))
        dispatch({
            type: 'CHANGE_STATE',
            fromState,
            toState
        })
    }
}

function handleStateChange(fromState, toState) {
    return (dispatch, getState) => {
        let state = getState()
        if (fromState === toState) return state
        else return state
    }
}
