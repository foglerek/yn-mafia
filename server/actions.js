import { joinGame, startGame, voteUser, specialVoteUser } from './action_creators'

export default function bindActions(socket, store) {

    socket.on('action', (action) => {
        switch (action.type.split('server/')[1]) {
            case 'JOIN_GAME':
                return store.dispatch(joinGame(action.data, socket.id))
            case 'START_GAME':
                return store.dispatch(startGame())
            case 'VOTE_USER':
                store.dispatch(voteUser(action.data))
            case 'SPECIAL_VOTE_USER':
                store.dispatch(specialVoteUser(action.data))
        }
    })

}

