const initialState = 0;

export default function appReducer(state = initialState, action){
    console.log('reducer', state, action);
  switch (action.type) {
    case 'SET_STATE':
    console.log(action.state);
      return state + action.state;
    default:
      return state
  }
}
