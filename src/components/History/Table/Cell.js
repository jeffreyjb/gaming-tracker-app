import classes from './Cell.module.css';

const Cell = (props) => {
	return (
		<div
			className={`${props.titleCell
				? classes.cellTitleStyle
				: classes.cellStyle}`}>
			{props.children}
		</div>
	);
};

export default Cell;
