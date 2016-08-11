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
    }
}

export function startGame() {
    return (dispatch, getState) => {
        dispatch(startRound())
    }
}

export function startRound() {
    return (dispatch, getState) => {
        dispatch(changeState(INITIAL_COUNTDOWN))
        dispatch(startTimer(10))
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
        dispatch(changeState(ROUND_RESULT))
        dispatch(startTimer(30))
    }
}

export function handleRoundEnd() {
    return (dispatch, getState) => {
        dispatch(startRound())
    }
}

export function playerJoined() {
    return (dispatch, getState) => {
        let state = getState()
        if (state.get('users').length >= MIN_PLAYERS) {
            dispatch(changeState(READY_TO_START))
        } else {
            return state
        }
    }
}

export function voteUser(data) {
    return (dispatch, getState) => {
        dispatch(updateVotes())
    }
}

export function specialVoteUser(data) {
    return (dispatch, getState) => {
        dispatch(updateVotes())
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

export function updateVotes(data) {
    return {
        type: 'UPDATE_VOTES',
        data
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
