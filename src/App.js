import CustomerRoute from './routes/CustomerRoute';
import AdminRoute from './routes/AdminRoute';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Shop from './pages/Shop';
import Page404 from './pages/Page404';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login}/>
        <AdminRoute path="/admin" exact component={Admin}/>
        <CustomerRoute path="/" component={Shop}/>
        <Route component={Page404}/>
      </Switch>
    </Router>
  );
}

export default App;
