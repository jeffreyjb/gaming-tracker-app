import classes from './GameTable.module.css';

const GameTable = (props) => {
	return <div className={classes.games}>{props.children}</div>;
};

export default GameTable;
