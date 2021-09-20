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
			{!editingGames && <Button onClick={launchGameManager}>Edit Games</Button>}
			{editingGames && <GameManager />}
		</Fragment>
	);
};

export default ManageGames;
