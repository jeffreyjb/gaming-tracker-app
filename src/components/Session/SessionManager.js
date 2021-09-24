import { useEffect, useContext, useState } from 'react';

import SessionContext from '../../store/session-context';

import ConfigureSession from './ConfigureSession';
import SessionHeader from './SessionHeader';

import classes from './SessionManager.module.css';

const SessionManager = (props) => {
	const [ imgClass, setImgClass ] = useState('');

	const sesCtx = useContext(SessionContext);

	useEffect(
		() => {
			if (sesCtx.currentGame === '' || sesCtx.currentGame === 'Variety') {
				setImgClass('');
			} else if (sesCtx.currentGame === 'Valorant') {
				setImgClass(classes.vlr);
			} else if (sesCtx.currentGame === 'New World') {
				setImgClass(classes.nw);
			} else if (sesCtx.currentGame === 'Rocket League') {
				setImgClass(classes.rl);
			} else if (sesCtx.currentGame === 'Path of Exile') {
				setImgClass(classes.poe);
			} else {
				setImgClass('');
			}
		},
		[ sesCtx, sesCtx.currentGame ]
	);

	return (
		<div className={`${imgClass} ${classes.manager}`}>
			<SessionHeader />
			<ConfigureSession />
		</div>
	);
};

export default SessionManager;
