import classes from './SessionStatus.module.css';

const SessionStatus = (props) => {
	return (
		<div className={classes.gameStatus}>
			<ul>
				<li>Current Game</li>
				<li>Playtime</li>
				<li>Icon</li>
			</ul>
		</div>
	);
};

export default SessionStatus;
