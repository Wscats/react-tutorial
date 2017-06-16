export default function counter(state = {
  count: 0
}, action) {
  const count = state.count
  switch (action.type) {
    case 'increase':
      return {
        count: count + 2
      }
    case 'multi':
      return {
        count: count * 2
      }
    default:
      return state
  }
}
