import { Fragment } from 'react';

import HistoryTable from './HistoryTable';

const HistoryManager = () => {
	return (
		<Fragment>
			<h1 style={{ margin: 0, padding: '10px' }}>History</h1>
			<HistoryTable />
		</Fragment>
	);
};

export default HistoryManager;
