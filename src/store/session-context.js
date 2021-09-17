import React, { useState } from 'react';

const SessionContext = React.createContext({
	statusText: 'offline',
  isPlaying: false,
  currentGame: '',
  setStatusText: (text)=>{},
  setIsPlaying: (isPlayingVal)=>{},
  setCurrentGame: (gameName)=>{}
});

export const SessionContextProvider = (props) => {
  const [ status, setStatus ] = useState('offline');
  const [ isPlayingGame, setIsPlayingGame ] = useState(false);
  const [ game, setGame ] = useState('');

  const setStatusHandler = (text) => {
    setStatus(text);
  }

  const isPlayingHandler = (isPlayingVal) => {
    setIsPlayingGame(isPlayingVal);
  }

  const setGameHandler = (gameName) => {
    setGame(gameName);
  }

  return (
		<SessionContext.Provider
			value={{
        statusText: status,
        isPlaying: isPlayingGame,
        currentGame: game,
        setStatusText: setStatusHandler,
        setIsPlaying: isPlayingHandler,
        setCurrentGame: setGameHandler
			}}>
			{props.children}
		</SessionContext.Provider>
	);
};

export default SessionContext;