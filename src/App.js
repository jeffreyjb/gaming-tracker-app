import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/layout/Layout';
import { SessionContextProvider } from './store/session-context';

import Session from './pages/Session';

function App() {
	return (
    <SessionContextProvider>
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
    </SessionContextProvider>
	);
}

export default App;
