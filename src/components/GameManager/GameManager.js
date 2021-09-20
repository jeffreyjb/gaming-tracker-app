import { Fragment, useState, useContext } from 'react';

import GameModal from './GameModal';
import Button from '../UI/Button';
import ListOfGames from './ListOfGames';

import GamesContext from '../../store/games-context';

const GameManager = () => {
	const [ isEditing, setIsEditing ] = useState(false);
	const [ isAddingGame, setIsAddingGame ] = useState(false);
	const [ isEditingGame, setIsEditingGame ] = useState(false);
	const [ isDeletingGame, setIsDeletingGame ] = useState(false);

	const gmsCtx = useContext(GamesContext);

	// useEffect(() => {
	// 	console.log('update effect for save game restored');
	// 	gmsCtx.updateGames(gmsCtx.savedGameList);
	// }, []);

	const addGame = () => {
		setIsAddingGame(true);
	};

	const updateGames = () => {
		// Post games to database
		gmsCtx.postGamesList();

		// End edit mode
		setIsEditing(false);
	};

	const cancelGameUpdate = () => {
		// Reset to saved game list
		gmsCtx.updateGames(gmsCtx.savedGameList);

		// End edit mode
		setIsEditing(false);
	};

	return (
		<Fragment>
			{isAddingGame && (
				<GameModal
					modalType={0}
					onClose={() => {
						setIsAddingGame(false);
					}}
				/>
			)}
			{isEditingGame && (
				<GameModal
					modalType={1}
					onClose={() => {
						setIsEditingGame(false);
					}}
				/>
			)}
			{isDeletingGame && (
				<GameModal
					modalType={2}
					onClose={() => {
						setIsDeletingGame(false);
					}}
				/>
			)}
			<ListOfGames
				editingGames={isEditing}
				editGameHandler={() => {
					setIsEditingGame(true);
				}}
				deleteGameHandler={() => {
					setIsDeletingGame(true);
				}}
			/>
			{!isEditing && (
				<Button
					onClick={() => {
						setIsEditing(true);
					}}>
					Edit
				</Button>
			)}
			{isEditing && <Button onClick={addGame}>Add Game</Button>}
			{isEditing && <Button onClick={updateGames}>Apply</Button>}
			{isEditing && <Button onClick={cancelGameUpdate}>Cancel</Button>}
		</Fragment>
	);
};

export default GameManager;
