import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/layout/Layout';
import { TimerContextProvider } from './store/timer-context';
import { SessionContextProvider } from './store/session-context';
import { GamesContextProvider } from './store/games-context';
import { HistoryContextProvider } from './store/history-context';

import Session from './pages/Session';
import ManageGames from './pages/ManageGames';
import Metrics from './pages/Metrics';
import History from './pages/History';

function App() {
	return (
		<TimerContextProvider>
			<SessionContextProvider>
				<GamesContextProvider>
					<HistoryContextProvider>
						<Layout>
							<Switch>
								<Route path='/' exact>
									<Redirect to='/session' />
								</Route>
								<Route path='/session'>
									<Session />
								</Route>
								<Route path='/history'>
									<History />
								</Route>
								<Route path='/metrics'>
									<Metrics />
								</Route>
								<Route path='/manage-games'>
									<ManageGames />
								</Route>
								<Route path='*'>
									<Redirect to='/session' />
								</Route>
							</Switch>
						</Layout>
					</HistoryContextProvider>
				</GamesContextProvider>
			</SessionContextProvider>
		</TimerContextProvider>
	);
}

export default App;
