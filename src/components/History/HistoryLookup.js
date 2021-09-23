import { Fragment, useState } from 'react';

import DateSelect from './DateSelect';
import Button from '../UI/Button';

import useHttp from '../../hooks/use-http';

const HistoryLookup = (props) => {
	const [ selectedMonth, setSelectedMonth ] = useState('');
	const [ selectedDay, setSelectedDay ] = useState('');
	const [ selectedYear, setSelectedYear ] = useState('');
	const [ dateIsValid, setDateIsValid ] = useState(true);

	const { sendRequest: fetchSession } = useHttp();

	const updateActiveSessions = (sessionsObj) => {
		const activeSessions = [];

		let maxDays = 0;
		let currentYear = parseInt(selectedYear);
		let currentMonth = parseInt(selectedMonth);
		let currentDay = parseInt(selectedDay);

		for (let i = 0; i < 7; i++) {
			if (
				currentMonth === 1 ||
				currentMonth === 3 ||
				currentMonth === 5 ||
				currentMonth === 7 ||
				currentMonth === 8 ||
				currentMonth === 10 ||
				currentMonth === 12
			) {
				maxDays = 31;
			} else if (currentMonth === 2) {
				if (currentYear % 4 === 0) {
					maxDays = 29;
				} else {
					maxDays = 28;
				}
			} else {
				maxDays = 30;
			}
			// console.log('Max Days: ' + maxDays);

			if (currentDay > maxDays) {
				currentDay = 1;
				currentMonth++;
				if (currentMonth > 12) {
					currentMonth = 1;
					currentYear++;
				}
			}

			const strYear = currentYear.toString();
			const paddedMonth = currentMonth.toString().padStart(2, '0');
			const paddedDay = currentDay.toString().padStart(2, '0');

			if (!sessionsObj[strYear]) {
				activeSessions.push(undefined);
			} else if (!sessionsObj[strYear][paddedMonth]) {
				activeSessions.push(undefined);
			} else {
				activeSessions.push(sessionsObj[strYear][paddedMonth][paddedDay]);
			}

			// console.log(`M: ${currentMonth} D: ${currentDay} Y: ${currentYear}`);

			currentDay++;
		}
		// console.log(activeSessions);
		return activeSessions;
	};

	const fetchSessions = () => {
		const transformData = (sessionsObj) => {
			console.log('fetching sessions...');
			props.saveFetchedSession(sessionsObj);

			const ses = updateActiveSessions(sessionsObj);
			props.setActiveSessionData(ses);

			props.setSessionLoaded(true);
		};

		if (!props.alreadyFetchedData) {
			fetchSession(
				{
					url:
						'https://react-http-demo-90001-default-rtdb.firebaseio.com/sessions.json'
				},
				transformData
			);
		} else {
			const ses = updateActiveSessions(props.fetchedSessionData);
			props.setActiveSessionData(ses);
		}
	};

	const grabHistory = () => {
		// Validate the date has been properly selected
		if (
			selectedDay.trim() === '' ||
			selectedMonth.trim() === '' ||
			selectedYear.trim() === ''
		) {
			setDateIsValid(false);
			return;
		}

		// Get fetch session data
		fetchSessions();

		// Pass data to Table
		setDateIsValid(true);
	};

	return (
		<Fragment>
			<DateSelect month selectedValHandler={setSelectedMonth} />
			<DateSelect day selectedValHandler={setSelectedDay} />
			<DateSelect year selectedValHandler={setSelectedYear} />
			<Button onClick={grabHistory}>Load History</Button>
			{!dateIsValid && <p>Invalid Date!!!</p>}
		</Fragment>
	);
};

export default HistoryLookup;
