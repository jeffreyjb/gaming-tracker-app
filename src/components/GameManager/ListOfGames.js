import { useState, useEffect, useContext } from 'react';

import GameItem from './GameItem';

import GamesContext from '../../store/games-context';

import classes from './ListOfGames.module.css';

const ListOfGames = (props) => {
	const [ games, setGames ] = useState([]);
	const gmsCtx = useContext(GamesContext);

	useEffect(
		() => {
			//console.log('List Render Side Effect');
			let id = 0;
			const tempGames = [];
			for (const currentGame of gmsCtx.gamesList) {
				tempGames.push(
					<GameItem
						key={id}
						game={currentGame.title}
						gameGenre={currentGame.genre}
						editMode={props.editingGames}
						editGameHandler={props.editGameHandler}
						deleteGameHandler={props.deleteGameHandler}
					/>
				);
				id++;
			}
			setGames(tempGames);
		},
		[
			gmsCtx.gamesList,
			props.editingGames,
			props.editGameHandler,
			props.deleteGameHandler
		]
	);

	return <ul className={classes.ListContainer}>{games}</ul>;
};

export default ListOfGames;
