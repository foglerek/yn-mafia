
export function joinGame(data) {
    return function(dispatch, getState) {
        dispatch(addUser(data))
    }
}

export function addUser(data) {
    return {
        type: 'ADD_USER',
        data
    }
}
