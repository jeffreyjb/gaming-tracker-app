import { Fragment, useContext } from 'react';

import HistoryContext from '../../store/history-context';

import Button from '../UI/Button';

import classes from './HistoryNavigator.module.css';

const HistoryNavigator = (props) => {
	const hstCtx = useContext(HistoryContext);

	const showPreviousWeek = () => {
		// Find a week ago
		hstCtx.setNewDate(false);
	};

	const showNextWeek = () => {
		// Find a week ahead
		hstCtx.setNewDate(true);
	};

	return (
		<Fragment>
			<Button
				parentClassName={classes.histNavButton}
				onClick={showPreviousWeek}>
				Previous
			</Button>
			<Button parentClassName={classes.histNavButton} onClick={showNextWeek}>
				Next
			</Button>
		</Fragment>
	);
};

export default HistoryNavigator;
