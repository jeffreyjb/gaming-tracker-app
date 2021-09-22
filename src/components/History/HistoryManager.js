import { Fragment } from 'react';

import HistoryTable from './HistoryTable';

const HistoryManager = (props) => {
	const date = new Date();
	console.log(date.getFullYear());
	return (
		<Fragment>
			<h1 style={{ margin: 0, padding: '10px' }}>History Coming Soon!!</h1>
			<HistoryTable />
		</Fragment>
	);
};

export default HistoryManager;
