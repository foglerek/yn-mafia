import config from '../config'
import server from '../server/main'
import newStore from '../server/store'
import bindActions from '../server/actions'
import { userConnected } from '../server/action_creators'
import _debug from 'debug'
import socketio from 'socket.io'
import http from 'http'

const debug = _debug('app:bin:server')
const port = config.server_port
const host = config.server_host

let socketserver = http.Server(server.callback()),
    io = socketio(socketserver);

let state = {
    selected_characters: 0
}

let store = newStore(io);

// Register Socket IO hook
io.on('connection', (socket) => {
    bindActions(socket, store)
    store.dispatch(userConnected(socket))
})

socketserver.listen(port)
debug(`Server is now running at http://${host}:${port}.`)
debug(`Server accessible via localhost:${port} if you are using the project defaults.`)
