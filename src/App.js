import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/layout/Layout';
import SessionContext from './store/session-context';

import Session from './pages/Session';

function App() {
	return (
    <SessionContext.Provider value={{
      statusText: 'offline',
      isPlaying: false,
      currentGame: ''
    }}>
      <Layout>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/session' />
          </Route>
          <Route path='/session'>
            <Session/>
          </Route>
          <Route path='/history'>
            <div>History</div>
          </Route>
          <Route path='/metrics'>
            <div>Metrics</div>
          </Route>
          <Route path='/manage-games'>
            <div>Manage Games</div>
          </Route>
          <Route path='*'>
            <Redirect to='/session' />
          </Route>
        </Switch>
      </Layout>
      </SessionContext.Provider>
	);
}

export default App;
