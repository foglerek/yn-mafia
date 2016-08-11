import { joinGame, startGame, voteUser, specialVoteUser } from './action_creators'

export default function bindActions(socket, store) {

    socket.on('JOIN_GAME', (data) => {
        console.log('server data', data);
        store.dispatch(joinGame(data))
    })

    socket.on('START_GAME', () => {
        store.dispatch(startGame())
    })

    socket.on('VOTE_USER', (data) => {
        store.dispatch(voteUser(data))
    })

    socket.on('SPECIAL_VOTE_USER', (data) => {
        store.dispatch(specialVoteUser(data))
    })
}

