import React, { useState } from 'react';
import useHttp from '../hooks/use-http';

const GamesContext = React.createContext({
	gamesLoaded: false,
	savedGameList: [],
	gamesList: [],
	currentGame: {},
	updateGames: (gameObj) => {},
	fetchGames: () => {},
	postGamesList: () => {}
});

export const GamesContextProvider = (props) => {
	const [ gamesListKey, setGamesListKey ] = useState('');
	const [ savedGameList, setSavedGameList ] = useState([]);
	const [ gamesList, setGamesList ] = useState([]);
	const [ gamesLoaded, setGamesLoaded ] = useState(false);

	const { sendRequest: fetchListOfGames } = useHttp();
	const { sendRequest: postListOfGames } = useHttp();

	const updateGames = (gameObj) => {
		//console.log(gameObj);
		setGamesList(gameObj);
	};

	const fetchGames = () => {
		setGamesLoaded(true);
		console.log('fetching...');

		const transformData = (gamesListObj) => {
			setGamesListKey(Object.keys(gamesListObj)[0]);
			setGamesList(gamesListObj[Object.keys(gamesListObj)[0]].gamesList);
			setSavedGameList([
				...gamesListObj[Object.keys(gamesListObj)[0]].gamesList
			]);
		};

		fetchListOfGames(
			{
				url:
					'https://react-http-demo-90001-default-rtdb.firebaseio.com/gamesList.json'
			},
			transformData
		);
	};

	const postGamesList = () => {
		console.log('patching new list...');

		const postURL =
			'https://react-http-demo-90001-default-rtdb.firebaseio.com/gamesList/' +
			gamesListKey +
			'/.json';

		postListOfGames(
			{
				url: postURL,
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: { gamesList }
			},
			() => {}
		);

		// Set new "saved games list"
		const newSavedGamesList = [ ...gamesList ];
		setSavedGameList(newSavedGamesList);
	};

	return (
		<GamesContext.Provider
			value={{
				gamesLoaded,
				savedGameList,
				gamesList,
				currentGame: {},
				updateGames,
				fetchGames,
				postGamesList
			}}>
			{props.children}
		</GamesContext.Provider>
	);
};

export default GamesContext;
