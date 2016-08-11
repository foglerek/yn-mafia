
export function joinGame(data) {
    return (dispatch, getState) => {
        dispatch(addUser(data))
        dispatch(changeState('waiting_for_players'))
    }
}

export function startGame() {
    return (dispatch, getState) => {
        dispatch(changeState('initial_countdown'))
    }
}

export function addUser(data) {
    return {
        type: 'ADD_USER',
        data
    }
}

export function changeState(data) {
    return {
        type: 'CHANGE_STATE',
        data
    }
}
