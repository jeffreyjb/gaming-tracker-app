import { Fragment, useEffect, useState } from 'react';

const HistoryTableData = (props) => {
	const [ sessJsxArr, setSessJsxArr ] = useState([]);
	const [ colTitles, setColTitles ] = useState([]);
	const [ displayTable, setDisplayTable ] = useState(false);

	useEffect(
		() => {
			if (!props.noSessionsFound) {
				let tmpInd = 0;

				const jsxArr = props.sess.map((el, ind) => {
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

				setSessJsxArr(jsxArr);
			}
		},
		[ props.sess, props.noSessionsFound ]
	);

	return (
		<Fragment>
			{displayTable && colTitles}
			{displayTable && <ul>{sessJsxArr}</ul>}
			{!displayTable && <div>No sessions found!</div>}
		</Fragment>
	);
};

export default HistoryTableData;

//console.log(el[key].game);
// for (const curr in el[Object.keys(el)]) {
// 	//const val = el[Object.keys(el)[0]];
// 	const val = el[Object.keys(el)[curr]];
// 	console.log(val);
// }
