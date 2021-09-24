import { Fragment, useContext, useState } from 'react';

import DateSelect from './DateSelect';
import Button from '../UI/Button';

import useHttp from '../../hooks/use-http';

import HistoryContext from '../../store/history-context';

const HistoryLookup = () => {
	const [ dateIsValid, setDateIsValid ] = useState(true);

	const { sendRequest: fetchSession } = useHttp();

	const hstCtx = useContext(HistoryContext);

	const fetchSessions = () => {
		const transformData = (sessionsObj) => {
			console.log('fetching sessions...');
			hstCtx.setSessionData(sessionsObj);

			hstCtx.updateActiveSessions(
				sessionsObj,
				hstCtx.selectedMonth,
				hstCtx.selectedDay,
				hstCtx.selectedYear
			);

			hstCtx.setSessionLoaded(true);
		};

		if (!hstCtx.sessionLoaded) {
			fetchSession(
				{
					url:
						'https://react-http-demo-90001-default-rtdb.firebaseio.com/sessions.json'
				},
				transformData
			);
		} else {
			hstCtx.updateActiveSessions(
				hstCtx.sessionData,
				hstCtx.selectedMonth,
				hstCtx.selectedDay,
				hstCtx.selectedYear
			);
		}
	};

	const grabHistory = () => {
		// Validate the date has been properly selected
		if (
			hstCtx.selectedDay.toString().trim() === '' ||
			hstCtx.selectedMonth.toString().trim() === '' ||
			hstCtx.selectedYear.toString().trim() === ''
		) {
			setDateIsValid(false);
			return;
		}

		// Get fetch session data
		fetchSessions();

		// Pass data to Table
		setDateIsValid(true);

		// Set the date for table string
		hstCtx.refreshActiveSessionDates(
			hstCtx.selectedMonth,
			hstCtx.selectedDay,
			hstCtx.selectedYear
		);
	};

	return (
		<Fragment>
			<DateSelect month selectedValHandler={hstCtx.setSelectedMonth} />
			<DateSelect day selectedValHandler={hstCtx.setSelectedDay} />
			<DateSelect year selectedValHandler={hstCtx.setSelectedYear} />
			<Button onClick={grabHistory}>Load History</Button>
			{!dateIsValid && <p style={{ color: 'red' }}>Invalid Date!!!</p>}
		</Fragment>
	);
};

export default HistoryLookup;
