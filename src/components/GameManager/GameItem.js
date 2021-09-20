import { useContext } from 'react';

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

	return (
		<li className={classes.ListItem}>
			<p>{props.game}</p>
			<p>{props.gameGenre}</p>
			{props.editMode && <Button onClick={editHandler}>Edit Details</Button>}
			{props.editMode && <Button onClick={deleteHandler}>X</Button>}
		</li>
	);
};

export default GameItem;
