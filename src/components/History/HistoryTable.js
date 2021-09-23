import { Fragment, useState, useEffect } from 'react';

import HistoryTableData from './HistoryTableData';
import HistoryLookup from './HistoryLookup';

const HistoryTable = (props) => {
	const [ sessionData, setSessionData ] = useState(null);
	const [ activeSession, setActiveSession ] = useState(null);
	const [ sessionLoaded, setSessionLoaded ] = useState(false);
	const [ isSessionEmpty, setIsSessionEmpty ] = useState(true);

	useEffect(
		() => {
			if (activeSession) {
				for (const session in activeSession) {
					if (activeSession[session] !== undefined) {
						setIsSessionEmpty(false);
						break;
					}
				}
			}
		},
		[ activeSession ]
	);

	return (
		<Fragment>
			{activeSession && (
				<HistoryTableData
					noSessionsFound={isSessionEmpty}
					sess={activeSession}
				/>
			)}
			<HistoryLookup
				saveFetchedSession={setSessionData}
				fetchedSessionData={sessionData}
				setActiveSessionData={setActiveSession}
				alreadyFetchedData={sessionLoaded}
				setSessionLoaded={setSessionLoaded}
			/>
		</Fragment>
	);
};

export default HistoryTable;
