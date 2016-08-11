const initialState = {};
export default function appReducer(state = initialState, action){
    console.log('reducer', state, action);
  switch (action.type) {
    case 'SET_STATE':
      return state;
    default:
      return state
  }
}
