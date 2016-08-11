import { joinGame, startGame, voteUser, specialVoteUser } from './action_creators'

export default function bindActions(socket, store) {

    socket.on('action', (action) => {
        switch (action.type) {
            case 'server/JOIN_GAME':
                return store.dispatch(joinGame(action.data, socket.id))
            case 'server/START_GAME':
                return store.dispatch(startGame())
            case 'server/VOTE_USER':
                store.dispatch(voteUser(action.data))
            case 'server/SPECIAL_VOTE_USER':
                store.dispatch(specialVoteUser(action.data))
        }
    })

}

