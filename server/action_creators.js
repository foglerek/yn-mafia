import {
    WAITING_FOR_PLAYERS,
    READY_TO_START
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

export function joinGame(data) {
    return (dispatch, getState) => {
        let state = getState()
        if (state.get('state') === WAITING_FOR_PLAYERS) {
            dispatch(addUser(data))
            dispatch(playerJoined())
        } else {
            return state
        }
    }
}

export function startGame() {
    return (dispatch, getState) => {
        dispatch(startRound())
    }
}

export function startRound() {
    return (dispatch, getState) => {
        dispatch(changeState('initial_countdown'))
        dispatch(startTimer(10))
    }
}

export function beginDiscussion() {
    return (dispatch, getState) => {
        dispatch(changeState('discussion'))
        dispatch(startTimer(90))
    }
}

export function roundResult() {
    return (dispatch, getState) => {
        dispatch(changeState('round_result'))
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
            case 'initial_countdown':
                dispatch(beginDiscussion())
            case 'discussion':
                dispatch(changeState('time_up'))
                dispatch(setTimer(10))
            case 'time_up':
                dispatch(roundResult())
            case 'round_result':
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

export function addUser(data) {
    return {
        type: 'ADD_USER',
        data
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
