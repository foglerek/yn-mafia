
// ------------------------------------
// Actions
// ------------------------------------
export function joinGame (name) {
  return {
    type: 'server/JOIN_GAME',
    data: { name: name }
  }
}