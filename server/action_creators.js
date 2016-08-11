
export function joinGame(data) {
    return (dispatch, getState) => {
        dispatch(addUser(data))
        dispatch(changeState('waiting_for_players'))
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
        let stopTicker = setInterval(() => {
            let { timer } = getState()
            if (!timer) {
                stopTicker()
                dispatch(timeUp())
            } else {
                dispatch(setTimer(--timer))
            }
        }, 1000)
    }
}

export function timeUp() {
    return (dispatch, getState) => {
        let { state } = getState()
        switch (state) {
            case 'initial_countdown':
                dispatch(beginDiscussion())
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
        let fromState = getState().state
        dispatch(handleStateChange(fromState, toState))
        dispatch({
            type: 'CHANGE_STATE',
            data
        })
    }
}

function handleStateChange(fromState, toState) {
    if (fromState === toState) return
}
