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

	const generateSessionURLs = () => {
		const urlObject = {};
		const baseURL =
			'https://react-http-demo-90001-default-rtdb.firebaseio.com/';

		/* let maxDay = 28;
      let maxMonth = 12;
      
      for (i = 0; i < 7; i++){
        

        urlObject.i =
        baseURL +
        selectedYear +
        '/' +
        selectedMonth +
        '/' +
        selectedDay +
        '/.json';
      }*/

		return urlObject;
	};

	const fetchSessions = () => {
		console.log('fetching sessions...');

		const urls = generateSessionURLs();
		console.log(urls);

		// const transformData = () => {

		// };

		// fetchSession(
		// 	{
		// 		url:
		// 			'https://react-http-demo-90001-default-rtdb.firebaseio.com/gamesList.json'
		// 	},
		// 	transformData
		// );
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

		// Get date from selects
		fetchSessions();

		// Determine data to grab from server

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
