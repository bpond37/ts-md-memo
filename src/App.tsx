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
import {Helmet} from 'react-helmet'

function App () {
  return (
    <>
    <Helmet>
      <title>이름을뭘로하지..</title>
    </Helmet>
    <Router>
      <Switch>
        <PrivateRoute redirectTo='/login' exact path="/" component ={EditorPage} />
        {/* <Helmet>
          <title>login</title>
        </Helmet> */}
        <Route exact path="/login" component ={Login} >
          
        </Route>
        <Route exact path="/register" component ={Register} />
      </Switch>
    </Router>
  </>
  );
}

export default inject(STORES.AUTH_STORE)(observer(App));
