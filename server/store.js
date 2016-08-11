import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'

export default function newStore(io) {
    let store = createStore(reducer, compose(
        applyMiddleware(thunk)
    ))
    store.subscribe(
        () => io.emit('state', store.getState().toJS())
    )
    return store
}
