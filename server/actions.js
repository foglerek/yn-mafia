import { joinGame, startGame } from './action_creators'

export default function bindActions(socket, store) {

    socket.on('JOIN_GAME', (data) => {
        store.dispatch(joinGame(data))
    })

    socket.on('START_GAME', () => {
        store.dispatch(startGame())
    })
}

