import React, { useState } from 'react';
import useHttp from '../hooks/use-http';

const GamesContext = React.createContext({
  gamesLoaded: false,
	gamesList: [],
  setGames: ()=>{},
  fetchGames: ()=>{}
});

export const GamesContextProvider = (props) => {
 
  const [ gamesList, setGamesList ] = useState([]);
  const [ gamesLoaded, setGamesLoaded ] = useState(false);

  const { sendRequest: fetchListOfGames } = useHttp();

  const setGames = () => {
    console.log('setting...');
    //setGamesList([]);
  };

  const fetchGames = () => {
    setGamesLoaded(true);
    console.log('fetching...');
    const transformData = (gamesListObj) => {
      setGamesList(gamesListObj[Object.keys(gamesListObj)[0]].gamesList);
    }; 

    fetchListOfGames(
      {
        url: 'https://react-http-demo-90001-default-rtdb.firebaseio.com/gamesList.json'
      },
      transformData
    );
  };

  return (
		<GamesContext.Provider
			value={{
        gamesLoaded,
        gamesList,
        setGames,
        fetchGames
			}}>
			{props.children}
		</GamesContext.Provider>
	);
};

export default GamesContext;