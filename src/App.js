import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/layout/Layout';

function App() {
	return (
		<Layout>
			<Switch>
				<Route path='/' exact>
					<Redirect to='/session' />
				</Route>
				<Route path='/session'>
					<div>Session</div>
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
	);
}

export default App;
