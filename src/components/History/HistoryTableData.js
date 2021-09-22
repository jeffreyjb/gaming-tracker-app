import {Fragment} from 'react';

const HistoryTableData = (props) => {
	return (
    <Fragment>
      {!props.noSessionsFound && <div>Found data</div>}
      {props.noSessionsFound && <div>No sessions found!</div>}
    </Fragment>
  );
};

export default HistoryTableData;
