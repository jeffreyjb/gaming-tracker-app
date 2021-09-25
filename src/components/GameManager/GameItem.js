import { useContext, Fragment } from 'react';

import GamesContext from '../../store/games-context';
import Button from '../UI/Button';

import classes from './GameItem.module.css';

const GameItem = (props) => {
	const gmsCtx = useContext(GamesContext);

	const deleteHandler = () => {
		gmsCtx.currentGame = { title: props.game, genre: props.gameGenre };
		props.deleteGameHandler();
	};

	const editHandler = () => {
		gmsCtx.currentGame = { title: props.game, genre: props.gameGenre };
		props.editGameHandler();
	};

	const editButtons = (
		<ul className={classes.editButtons}>
			<li>
				<Button onClick={editHandler}>Edit Details</Button>
			</li>
			<li>
				<Button onClick={deleteHandler}>Delete Game</Button>
			</li>
		</ul>
	);

	return (
		<div className={classes.card}>
			<ul className={classes.gameInfo}>
				<li>Game: {props.game},</li>
				<li>Genre: {props.gameGenre}</li>
			</ul>
			{props.editMode && editButtons}
		</div>
	);
};

export default GameItem;
