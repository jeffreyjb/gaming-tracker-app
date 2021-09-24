import { useContext, useRef, useEffect, useState } from 'react';

import SessionContext from '../../store/session-context';
import GamesContext from '../../store/games-context';

import classes from './GameSelect.module.css';

const GameSelect = () => {
	const sesCtx = useContext(SessionContext);
	const gmsCtx = useContext(GamesContext);

	const selectRef = useRef();
	const [ loadedGamesList, setLoadedGamesList ] = useState([]);

	useEffect(
		() => {
			//console.log('updating games dropdown...');
			if (!gmsCtx.gamesLoaded) {
				gmsCtx.fetchGames();
			}

			if (gmsCtx.savedGameList !== []) {
				let gamesList = [];
				gamesList = gmsCtx.savedGameList.map((gameObj, ind) => {
					return (
						<option value={gameObj.title} key={'ind' + ind}>
							{gameObj.title}
						</option>
					);
				});
				setLoadedGamesList(gamesList);
			}
		},
		[ gmsCtx, gmsCtx.gamesLoaded, gmsCtx.savedGameList ]
	);

	useEffect(
		() => {
			for (const opt of loadedGamesList) {
				if (opt.props.value === sesCtx.currentGame) {
					const tmpStr = opt.key.toString();
					const selInd = parseInt(tmpStr[tmpStr.length - 1]);
					selectRef.current.selectedIndex = selInd + 1;
				}
			}
		},
		[ sesCtx, sesCtx.currentGame, loadedGamesList ]
	);

	const gameChangeHandler = () => {
		const currentGame =
			selectRef.current.options[selectRef.current.selectedIndex].text;
		sesCtx.setCurrentGame(currentGame);
	};

	return (
		<div className={classes.gameDropdown}>
			<p>Choose Game:</p>
			<select
				ref={selectRef}
				onChange={gameChangeHandler}
				name='game-options'
				defaultValue=''>
				<option value='' disabled>
					Please Select a Game...
				</option>
				{loadedGamesList}
			</select>
		</div>
	);
};

export default GameSelect;

//
// Old fetch code
//
// useEffect(()=>{
// 	setUpGames(
// 		{
// 			url:
// 				'https://react-http-demo-90001-default-rtdb.firebaseio.com/gamesList.json',
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json'
// 			},
// 			body: { gamesList: [{title: 'Path of Exile', genre: 'ARPG'}, {title: 'Valorant', genre: 'FPS'},{title: 'Rocket League', genre: 'Sports'},{title: 'New World', genre: 'MMO'}] }
// 		},
// 		()=>{}
// 	);
// },[]);

// useEffect(()=>{
//   const transformData = (gamesObj) => {
//     const loadedGames = [];

//     for (const gameKey in gamesObj) {
//       loadedGames.push({ gameName: gamesObj[gameKey].title, gameGenre: gamesObj[gameKey].genre });
//     }

//     const listJsx = loadedGames.map((gameObj,ind)=>{return <option key={'ind'+ind}>{gameObj.gameName}</option>;});
//     setGamesList(listJsx);
//   };

//   fetchGames(
//     {
//       url: 'https://react-http-demo-90001-default-rtdb.firebaseio.com/games.json'
//     },
//     transformData
//   );
// },[fetchGames]);
