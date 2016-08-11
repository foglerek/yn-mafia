const initialState = {};

export default function appReducer(state = initialState, action){


  switch (action.type) {
    case 'SET_STATE':

      return Object.assign({}, action.state);
    default:
      return state
  }
}
