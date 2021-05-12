import { useContext, useState, useEffect } from 'react';
import { Store } from '../store';
import { serviceCall } from '../service';
import '../App.css';

function Login(props) {
  const { state, dispatch } = useContext(Store);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [adminViewActive, setAdminViewActive] = useState(false);

  useEffect(() => {
    if (state.users.list) return;
    serviceCall('users', 'GET', null, (data) => {
      dispatch({  
        type: 'SET_USERS',
        data: data
      })
    });
  }, [state.users, dispatch]);

  const _setAdminViewActive = (isActive) => {
    setAdminViewActive(isActive);
    setSelectedUserId('');
  }

  const signIn = () => {
    if (!selectedUserId) return;
    dispatch({  
      type: 'SET_SELECTED_USER',
      data: state.users.list.find(user => user.id === parseInt(selectedUserId))
    });
    props.history.push(adminViewActive ? '/admin' : '/');
  }
  
  const admins = (state.users.list || []).filter(item => item.role === 'ADMIN');
  const customers = (state.users.list || []).filter(item => item.role === 'CUSTOMER');
  return (
    <div className="login-container">
      <div className={'login' + (adminViewActive ? ' right-panel-active' : '') }>
        <div className="form-container sign-up-container">
          <h2>Welcome to dashboard</h2>
          <p>please select your name</p>
          <select value={selectedUserId} onChange={(event) => setSelectedUserId(event.target.value)}>
            <option></option>
            {admins.map(item => (
              <option key={item.id} value={item.id}>{item.name.firstName} {item.name.lastName}</option>
            ))}
          </select>
          <button onClick={signIn}>Sign Ip</button>
        </div>
        <div className="form-container sign-in-container">
          <h2>Welcome to shop</h2>
          <p>please select your name</p>
          <select value={selectedUserId} onChange={(event) => setSelectedUserId(event.target.value)}>
            <option></option>
            {customers.map(item => (
              <option key={item.id} value={item.id}>{item.name.firstName} {item.name.lastName}</option>
            ))}
          </select>
          <button onClick={signIn}>Sign In</button>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h2>Customer?</h2>
              <p>Let's do some shopping</p>
              <button onClick={() => _setAdminViewActive(false)}>Shop</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h2>Admin?</h2>
              <p>Let's do some changes</p>
              <button onClick={() => _setAdminViewActive(true)}>Let's go</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
