import { Fragment, useEffect, useContext, useState } from 'react';

import HistoryContext from '../../store/history-context';

const HistoryTableData = () => {
	const [ sessJsxArr, setSessJsxArr ] = useState([]);
	const [ colTitles, setColTitles ] = useState([]);
	const [ displayTable, setDisplayTable ] = useState(false);
	const [ dateRangeString, setDateRangeString ] = useState('');

	const hstCtx = useContext(HistoryContext);

	useEffect(
		() => {
			if (!hstCtx.isSessionEmpty) {
				let tmpInd = 0;

				const jsxArr = hstCtx.activeSession.map((el, ind) => {
					if (el !== undefined) {
						const tmpJsx = [];
						for (const key in el) {
							tmpInd++;
							tmpJsx.push(
								<li key={tmpInd}>{`Date: ${el[key].date}, Game: ${el[key]
									.game}, Session Length: ${el[key].timerStr}`}</li>
							);
						}
						return tmpJsx;
					}
					return '';
				});

				const colTitlesJsx = (
					<Fragment>
						<div>Date</div>
						<div>Game</div>
						<div>Session Length</div>
					</Fragment>
				);

				if (tmpInd === 0) {
					setColTitles('');
					setDisplayTable(false);
				} else {
					setColTitles(colTitlesJsx);
					setDisplayTable(true);
				}

				if (hstCtx.sessionDates.startDate !== undefined) {
					setDateRangeString(
						<p>{`${hstCtx.sessionDates.startDate} - ${hstCtx.sessionDates
							.endDate}`}</p>
					);
				}

				setSessJsxArr(jsxArr);
			}
		},
		[
			hstCtx,
			hstCtx.activeSession,
			hstCtx.isSessionEmpty,
			hstCtx.sessionLoaded
		]
	);

	return (
		<Fragment>
			{hstCtx.sessionDates.startDate !== undefined && dateRangeString}
			{displayTable && colTitles}
			{displayTable && <ul>{sessJsxArr}</ul>}
			{!displayTable && <p>No sessions found!</p>}
		</Fragment>
	);
};

export default HistoryTableData;

// {displayTable && (
//   <p>{`${hstCtx.dateObj.startDate} - ${hstCtx.dateObj.endDate}`}</p>
// )}

//console.log(el[key].game);
// for (const curr in el[Object.keys(el)]) {
// 	//const val = el[Object.keys(el)[0]];
// 	const val = el[Object.keys(el)[curr]];
// 	console.log(val);
// }
