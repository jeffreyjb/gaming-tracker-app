import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { TimerContextProvider } from './store/timer-context';

import './index.css';
import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
    <TimerContextProvider>
			<App />
      </TimerContextProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
