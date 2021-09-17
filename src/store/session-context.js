import React from 'react';

const SessionContext = React.createContext({
	statusText: 'offline',
  isPlaying: false,
  currentGame: ''
});

export default SessionContext;