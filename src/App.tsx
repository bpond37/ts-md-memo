import React from 'react';
import './App.css';
// import TopBar from './components/TopBar';
// import Memo from './components/Memo';

// import EditorTemplate from './components/editor/EditorTemplate'
import EditorPage from './pages/EditorPage';
import autobind from 'autobind-decorator';
import { inject, observer} from 'mobx-react';
import { STORES } from './constants';
import MemoStore from './stores/memo/MemoStores';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
// type InjectedProps = {
//   [STORES.MEMO_STORE] : MemoStore
// }

function App () {
  return (
    <Router>
      <Switch>
        <Route path="/" component ={EditorPage} />
      </Switch>
    </Router>

  );
}

export default inject(STORES.MEMO_STORE)(observer(App));
