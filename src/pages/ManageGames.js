import { Fragment, useContext, useState } from 'react';

import Button from '../components/UI/Button';
import GameManager from '../components/GameManager/GameManager';

import GamesContext from '../store/games-context';

const ManageGames = () => {
	const [ editingGames, setEditingGames ] = useState(false);

	const gmsCtx = useContext(GamesContext);

	const launchGameManager = () => {
		if (!gmsCtx.gamesLoaded) {
			gmsCtx.fetchGames();
		} else {
			gmsCtx.updateGames(gmsCtx.savedGameList);
		}
		setEditingGames(true);
	};

	return (
		<Fragment>
			<h1 style={{ margin: 0, padding: '10px' }}>Manage Games</h1>
			{!editingGames && (
				<Button onClick={launchGameManager}>Load Game List</Button>
			)}
			{editingGames && <GameManager />}
		</Fragment>
	);
};

export default ManageGames;
