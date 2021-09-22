import { Fragment } from 'react';

import HistoryTableHeader from './HistoryTableHeader';
import HistoryTableData from './HistoryTableData';
import HistoryLookup from './HistoryLookup';

const HistoryTable = (props) => {
	return (
		<Fragment>
			<HistoryTableHeader />
			<HistoryTableData />
			<HistoryLookup />
		</Fragment>
	);
};

export default HistoryTable;
