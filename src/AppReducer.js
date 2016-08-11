const initialState = 0;
export default function appReducer(state = initialState, action){
  switch (action.type) {
    case 'SET_STATE':
      return state.merge(action.state);
    default:
      return state
  }
}
