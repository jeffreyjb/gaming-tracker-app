import { Fragment, useState, useContext } from 'react';

import TimerContext from '../../store/timer-context';
import SessionContext from '../../store/session-context';
import HistoryContext from '../../store/history-context';

import Button from '../../components/UI/Button';
import GameSelect from './GameSelect';

import useHttp from '../../hooks/use-http';

import classes from './ConfigureSession.module.css';

const ConfigureSession = () => {
	const [ pauseResumeButtonTitle, setPauseResumeButtonTitle ] = useState(
		'Pause Session'
	);
	const [ validGame, setIsValidGame ] = useState(true);

	const { sendRequest: saveSessionData } = useHttp();

	const tmrCtx = useContext(TimerContext);
	const sesCtx = useContext(SessionContext);
	const hisCtx = useContext(HistoryContext);

	const warningText = (
		<p style={{ color: 'red' }}>Please select a valid game!!</p>
	);

	const startSession = () => {
		if (sesCtx.currentGame === '') {
			setIsValidGame(false);
			return;
		}

		setIsValidGame(true);

		tmrCtx.resetTimer();
		tmrCtx.startTimer(1000);

		sesCtx.setIsPlaying(true);
		sesCtx.setStatusText('Playing: ' + sesCtx.currentGame);
	};

	const endSession = () => {
		tmrCtx.stopTimer();
		setPauseResumeButtonTitle('Pause Session');

		// Save game from session
		const sessionGame = sesCtx.currentGame;

		sesCtx.setIsPlaying(false);
		sesCtx.setStatusText('offline');
		sesCtx.setCurrentGame('');

		// Save data
		const today = new Date();
		const dd = String(today.getDate()).padStart(2, '0');
		const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		const yyyy = today.getFullYear();
		const dateStr = '' + mm + '/' + dd + '/' + yyyy;

		const postData = {
			game: sessionGame,
			timer: tmrCtx.timerVal,
			timerStr: tmrCtx.timer,
			date: dateStr
		};
		const urlString =
			'https://react-http-demo-90001-default-rtdb.firebaseio.com/sessions/' +
			yyyy +
			'/' +
			mm +
			'/' +
			dd +
			'.json';

		saveSessionData(
			{
				url: urlString,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: postData
			},
			() => {}
		);

		// Make sure to inform history component it needs to refresh the loaded history list
		hisCtx.setSessionLoaded(false);
		hisCtx.setIsSessionEmpty(true);
		hisCtx.setActiveSession(null);
		hisCtx.setSessionData(null);
	};

	const pauseResumeHandler = () => {
		if (tmrCtx.timerIsPaused) {
			tmrCtx.resumeTimer();
			setPauseResumeButtonTitle('Pause Session');
		} else {
			tmrCtx.pauseTimer();
			setPauseResumeButtonTitle('Resume Session');
		}
	};

	return (
		<Fragment>
			<Button
				parentClassName={classes.sessionButton}
				disabled={sesCtx.isPlaying}
				onClick={() => {
					startSession();
				}}>
				Start Session
			</Button>
			<Button
				parentClassName={classes.sessionButton}
				disabled={!sesCtx.isPlaying}
				onClick={pauseResumeHandler}>
				{pauseResumeButtonTitle}
			</Button>
			<Button
				parentClassName={classes.sessionButton}
				disabled={!sesCtx.isPlaying}
				onClick={() => {
					endSession();
				}}>
				End Session
			</Button>
			{!sesCtx.isPlaying && <GameSelect />}
			{!validGame && warningText}
		</Fragment>
	);
};

export default ConfigureSession;
