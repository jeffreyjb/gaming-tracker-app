import { useContext, useRef, useEffect, useState } from 'react';

import SessionContext from '../../store/session-context';

import useHttp from '../../hooks/use-http';

import classes from './GameSelect.module.css';

const GameSelect = () => {
  const { sendRequest: fetchGames } = useHttp();
  const [ gamesList, setGamesList ] = useState([]);

  // const { sendRequest: setUpGames } = useHttp();
  //
  // useEffect(()=>{
	// 	setUpGames(
	// 		{
	// 			url:
	// 				'https://react-http-demo-90001-default-rtdb.firebaseio.com/games.json',
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			},
	// 			body: { title: 'Path of Exile', genre: 'ARPG' }
	// 		},
	// 		()=>{}
	// 	);
  // },[]);

  useEffect(()=>{
    const transformData = (gamesObj) => {
      const loadedGames = [];

      for (const gameKey in gamesObj) {
        loadedGames.push({ gameName: gamesObj[gameKey].title, gameGenre: gamesObj[gameKey].genre });
      }

      const listJsx = loadedGames.map((gameObj,ind)=>{return <option key={'ind'+ind}>{gameObj.gameName}</option>;});
      setGamesList(listJsx);
    }; 

    fetchGames(
      {
        url: 'https://react-http-demo-90001-default-rtdb.firebaseio.com/games.json'
      },
      transformData
    );
  },[fetchGames]);

  const sesCtx = useContext(SessionContext);
  const selectRef = useRef();

  const gameChangeHandler = () => {
    const currentGame = selectRef.current.options[selectRef.current.selectedIndex].text;
    sesCtx.setCurrentGame(currentGame);
  }

  return (
    <div className={classes.gameDropdown}>
      <p>Choose Game:</p>
      <select ref={selectRef} onChange={gameChangeHandler} name='game-options' defaultValue=''>
        <option value='' disabled>Please Select a Game...</option>
        {gamesList}
      </select>
    </div>
  );
};

export default GameSelect;