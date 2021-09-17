import { Fragment, useContext } from 'react';

import SessionContext from '../../store/session-context';

import classes from './SessionHeader.module.css';

const SessionHeader = () => {
  const sesCtx = useContext(SessionContext);

  return (
    <Fragment>
      <h1 className={classes.title}>Gaming Session</h1>
      <div className={classes.gameStatus}>
        Currently {sesCtx.statusText}
      </div>
    </Fragment>
  );
};

export default SessionHeader;