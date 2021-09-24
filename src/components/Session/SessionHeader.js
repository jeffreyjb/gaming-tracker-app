import { Fragment, useContext } from 'react';

import SessionContext from '../../store/session-context';

import classes from './SessionHeader.module.css';

const SessionHeader = () => {
	const sesCtx = useContext(SessionContext);

	return (
		<Fragment>
			<div className={classes.headerLocation}>
				<h1 className={classes.title}>Gaming Session</h1>
				<p className={classes.gameStatus}>Currently {sesCtx.statusText}</p>
			</div>
		</Fragment>
	);
};

export default SessionHeader;
