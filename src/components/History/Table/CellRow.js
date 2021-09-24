import classes from './CellRow.module.css';

const CellRow = (props) => {
	return <div className={classes.cellRowStyle}>{props.children}</div>;
};

export default CellRow;
