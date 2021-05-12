const users = (state, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, list: action.data};
    case 'SET_SELECTED_USER':
      return { ...state, selected: action.data};
    default:
      return state;
  }
}

export default users;