import combineReducers from './combineReducers';
import users from './users';
import products from './products';
import cart from './cart';

const reducer = combineReducers({
  users,
  products,
  cart
});

export default reducer;