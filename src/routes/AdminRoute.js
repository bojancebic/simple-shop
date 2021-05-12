import React from 'react'
import { Store } from '../store';
import { Redirect, Route } from 'react-router-dom'

const AdminRoute = ({ component: Component, ...rest }) => {

  return (
    <Store.Consumer>
      {({state}) => (
        <Route
          {...rest}
          render={props =>
            (state.users.selected || {}).role === 'ADMIN' ? (
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

export default AdminRoute