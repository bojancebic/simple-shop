import { useReducer, createContext } from 'react'
import reducer from '../reducers'

export const Store = createContext();

const initialState = {
  users: {
    list: null,
    selected: null
  },
  products: {
    list: null
  },
  cart: []
}

export function Provider({children}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>
}