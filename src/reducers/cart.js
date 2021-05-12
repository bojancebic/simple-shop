const users = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [ ...state, action.data ];
    case 'REMOVE_FROM_CART':
      return [ ...state.slice(0, action.data), ...state.slice(action.data + 1) ];
    default:
      return state;
  }
}

export default users;