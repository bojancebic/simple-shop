import React from 'react'
import { Store } from '../store';
import { Redirect, Route } from 'react-router-dom'

const CustomerRoute = ({ component: Component, ...rest }) => {

  return (
    <Store.Consumer>
      {({state}) => (
        <Route
          {...rest}
          render={props =>
            (state.users.selected || {}).role === 'CUSTOMER' ? (
              <Component {...props} />
            ) : (
              <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )
          }
        />
      )}
    </Store.Consumer>
  )
}

export default CustomerRoute