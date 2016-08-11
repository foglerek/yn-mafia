export function addUser(name) {
    return {
        type: "ADD_USER",
        payload: {
            name: name
        }
    };
}
export function setState(state){
  return {
    type: 'SET_STATE',
    payload: state
  }
}
