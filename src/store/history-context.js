import React, { useState } from 'react';

const HistoryContext = React.createContext({
	sessionData: null,
	activeSession: null,
	sessionLoaded: false,
	isSessionEmpty: true,
	selectedMonth: '',
	selectedDay: '',
	selectedYear: '',
	sessionDates: {},
	setSessionData: (data) => {},
	setActiveSession: (activeSess) => {},
	setSessionLoaded: (flag) => {},
	setIsSessionEmpty: (flag) => {},
	setSelectedMonth: (mon) => {},
	setSelectedDay: (day) => {},
	setSelectedYear: (yr) => {},
	updateActiveSessions: (sessionsObj, month, day, year) => {},
	setNewDate: (flag) => {},
	refreshActiveSessionDates: () => {}
});

export const HistoryContextProvider = (props) => {
	const [ sessionData, setSessionData ] = useState(null);
	const [ activeSession, setActiveSession ] = useState(null);
	const [ sessionLoaded, setSessionLoaded ] = useState(false);
	const [ isSessionEmpty, setIsSessionEmpty ] = useState(true);
	const [ selectedMonth, setSelectedMonth ] = useState('');
	const [ selectedDay, setSelectedDay ] = useState('');
	const [ selectedYear, setSelectedYear ] = useState('');
	const [ sessionDates, setSessionDates ] = useState({});

	const setSessionDataHandler = (data) => {
		setSessionData(data);
	};

	const setActiveSessionHandler = (activeSess) => {
		setActiveSession(activeSess);
	};

	const setSessionLoadedHandler = (flag) => {
		setSessionLoaded(flag);
	};

	const setIsSessionEmptyHandler = (flag) => {
		setIsSessionEmpty(flag);
	};

	const setSelectedMonthHandler = (mon) => {
		setSelectedMonth(mon);
	};

	const setSelectedDayHandler = (day) => {
		setSelectedDay(day);
	};

	const setSelectedYearHandler = (yr) => {
		setSelectedYear(yr);
	};

	const updateActiveSessions = (sessionsObj, month, day, year) => {
		const activeSessions = [];

		let maxDays = 0;
		let currentYear = parseInt(year);
		let currentMonth = parseInt(month);
		let currentDay = parseInt(day);

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

			currentDay++;
		}
		setActiveSession(activeSessions);
	};

	const formatDateRangeStrings = (m, d, y) => {
		let maxDays = 0;
		let currentMonth = m;
		let currentDay = d;
		let currentYear = y;

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

		for (let i = 0; i < 6; i++) {
			currentDay++;
			if (currentDay > maxDays) {
				currentDay = 1;
				currentMonth++;
				if (currentMonth > 12) {
					currentMonth = 1;
					currentYear++;
				}
			}
		}

		const startDateStr = '' + m + '/' + d + '/' + y;
		const endDateStr = '' + currentMonth + '/' + currentDay + '/' + currentYear;

		const dateObj = {
			startDate: startDateStr,
			endDate: endDateStr
		};
		return dateObj;
	};

	// Flag = true => Set date a week ahead
	// Flag = false => Set date a week ago
	const setNewDate = (flag) => {
		let maxDays = 0;
		let currentYear = parseInt(selectedYear);
		let currentMonth = parseInt(selectedMonth);
		let currentDay = parseInt(selectedDay);

		if (flag) {
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

			for (let i = 0; i < 7; i++) {
				currentDay++;
				if (currentDay > maxDays) {
					currentDay = 1;
					currentMonth++;
					if (currentMonth > 12) {
						currentMonth = 1;
						currentYear++;
					}
				}
			}
		} else {
			let theoryMonth = currentMonth - 1;

			if (theoryMonth === 0) {
				theoryMonth = 12;
			}

			if (
				theoryMonth === 1 ||
				theoryMonth === 3 ||
				theoryMonth === 5 ||
				theoryMonth === 7 ||
				theoryMonth === 8 ||
				theoryMonth === 10 ||
				theoryMonth === 12
			) {
				maxDays = 31;
			} else if (theoryMonth === 2) {
				if (currentYear % 4 === 0) {
					maxDays = 29;
				} else {
					maxDays = 28;
				}
			} else {
				maxDays = 30;
			}

			for (let i = 0; i < 7; i++) {
				currentDay--;
				if (currentDay === 0) {
					currentDay = maxDays;
					currentMonth--;
					if (currentMonth === 0) {
						currentMonth = 12;
						currentYear--;
					}
				}
			}
		}

		setSelectedMonth(currentMonth);
		setSelectedDay(currentDay);
		setSelectedYear(currentYear);

		updateActiveSessions(sessionData, currentMonth, currentDay, currentYear);

		refreshActiveSessionDates(currentMonth, currentDay, currentYear);
	};

	const refreshActiveSessionDates = (m, d, y) => {
		const dateObj = formatDateRangeStrings(m, d, y);
		setSessionDates(dateObj);
	};

	return (
		<HistoryContext.Provider
			value={{
				sessionData,
				activeSession,
				sessionLoaded,
				isSessionEmpty,
				selectedMonth,
				selectedDay,
				selectedYear,
				sessionDates,
				setSessionData: setSessionDataHandler,
				setActiveSession: setActiveSessionHandler,
				setSessionLoaded: setSessionLoadedHandler,
				setIsSessionEmpty: setIsSessionEmptyHandler,
				setSelectedMonth: setSelectedMonthHandler,
				setSelectedDay: setSelectedDayHandler,
				setSelectedYear: setSelectedYearHandler,
				updateActiveSessions,
				setNewDate,
				refreshActiveSessionDates
			}}>
			{props.children}
		</HistoryContext.Provider>
	);
};

export default HistoryContext;
