const products = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, list: action.data};
    default:
      return state;
  }
}

export default products;