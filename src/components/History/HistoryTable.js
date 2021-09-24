import { Fragment, useContext, useEffect } from 'react';

import HistoryTableData from './HistoryTableData';
import HistoryNavigator from './HistoryNavigator';
import HistoryLookup from './HistoryLookup';

import HistoryContext from '../../store/history-context';

const HistoryTable = () => {
	const hstCtx = useContext(HistoryContext);

	useEffect(
		() => {
			if (hstCtx.activeSession) {
				for (const session in hstCtx.activeSession) {
					if (hstCtx.activeSession[session] !== undefined) {
						hstCtx.setIsSessionEmpty(false);
						break;
					}
				}
			}
		},
		[ hstCtx, hstCtx.activeSession ]
	);

	return (
		<Fragment>
			<HistoryLookup />
			<br />
			{hstCtx.activeSession && <HistoryTableData />}
			{hstCtx.activeSession && <HistoryNavigator />}
		</Fragment>
	);
};

export default HistoryTable;
