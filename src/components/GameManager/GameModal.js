import { Fragment, useState, useContext } from 'react';

import Modal from '../UI/Modal';
import Button from '../UI/Button';

import GamesContext from '../../store/games-context';

const GameModal = (props) => {
	const [ gameName, setGameName ] = useState('');
	const [ gameGenre, setGameGenre ] = useState('');
	const [ formValid, setFormValid ] = useState(true);

	const gmsCtx = useContext(GamesContext);

	const addGameHandler = (event) => {
		event.preventDefault();

		if (gameName.trim() !== '') {
			const tmpList = [ ...gmsCtx.gamesList ];
			tmpList.push({ genre: gameGenre, title: gameName });
			gmsCtx.updateGames(tmpList);
			props.onClose();
		} else {
			setFormValid(false);
		}
	};

	const editGameHandler = (event) => {
		event.preventDefault();

		if (gameName.trim() !== '') {
			const tmpList = gmsCtx.gamesList.map((gameObj) => {
				if (gameObj.title === gmsCtx.currentGame.title) {
					return { title: gameName, genre: gameGenre };
				}
				return gameObj;
			});
			gmsCtx.updateGames(tmpList);
			props.onClose();
		} else {
			setFormValid(false);
		}
	};

	const deleteGameHandler = (event) => {
		event.preventDefault();

		const tmpList = gmsCtx.gamesList.filter(
			(e) => e.title !== gmsCtx.currentGame.title
		);
		gmsCtx.updateGames(tmpList);
		gmsCtx.currentGame = {};
		props.onClose();
	};

	const addingGameContent = (
		<Fragment>
			<form onSubmit={addGameHandler}>
				<label htmlFor='game'>Game Title:</label>
				<input
					type='text'
					id='game'
					value={gameName}
					onChange={(event) => {
						setGameName(event.target.value);
					}}
				/>
				{!formValid && <p>Invalid Game Name!!!</p>}
				<label htmlFor='genre'>Game Genre:</label>
				<input
					type='text'
					id='genre'
					value={gameGenre}
					onChange={(event) => {
						setGameGenre(event.target.value);
					}}
				/>
				<Button type='submit'>Add Game</Button>
				<Button onClick={props.onClose}>Cancel</Button>
			</form>
		</Fragment>
	);

	const editingGameContent = (
		<Fragment>
			<form onSubmit={editGameHandler}>
				<label htmlFor='game'>Game Title:</label>
				<input
					type='text'
					id='game'
					value={gmsCtx.currentGame.title}
					onChange={(event) => {
						setGameName(event.target.value);
					}}
				/>
				{!formValid && <p>Invalid Game Name!!!</p>}
				<label htmlFor='genre'>Game Genre:</label>
				<input
					type='text'
					id='genre'
					value={gmsCtx.currentGame.genre}
					onChange={(event) => {
						setGameGenre(event.target.value);
					}}
				/>
				<Button type='submit'>Update Game</Button>
				<Button onClick={props.onClose}>Cancel</Button>
			</form>
		</Fragment>
	);

	const deletingGameContent = (
		<Fragment>
			<form onSubmit={deleteGameHandler}>
				<p>Are you sure you want to delete {gmsCtx.currentGame.title}</p>
				<Button type='submit'>Yes</Button>
				<Button onClick={props.onClose}>No</Button>
			</form>
		</Fragment>
	);

	return (
		<Modal onClose={props.onClose}>
			{props.modalType === 0 && addingGameContent}
			{props.modalType === 1 && editingGameContent}
			{props.modalType === 2 && deletingGameContent}
		</Modal>
	);
};

export default GameModal;
