import { useContext } from 'react';
import TimerContext from '../../../store/timer-context';
import SessionContext from '../../../store/session-context';

import classes from './SessionStatus.module.css';

const SessionStatus = (props) => {
  const timerCtx = useContext(TimerContext);
  const sesCtx = useContext(SessionContext);

	return (
		<div className={classes.gameStatus}>
			<ul>
        <li>Currently {sesCtx.statusText}</li>
				<li>{timerCtx.timer}</li>
			</ul>
		</div>
	);
};

export default SessionStatus;
