import React from 'react';
import './App.css';
import EditorPage from './pages/EditorPage';
import { inject, observer} from 'mobx-react';
import { STORES } from './constants';
import PrivateRoute from './components/PrivateRouter'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

function App () {
  return (
    <Router>
      <Switch>
        <PrivateRoute redirectTo='/login' exact path="/" component ={EditorPage} />
        <Route exact path="/login" component ={Login} />
        <Route exact path="/register" component ={Register} />
      </Switch>
    </Router>

  );
}

export default inject(STORES.AUTH_STORE)(observer(App));
