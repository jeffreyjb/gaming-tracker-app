import { Fragment, useState, useContext } from 'react'
import { Link } from 'react-router-dom';

import SessionContext from '../store/session-context';

import ConfigureSession from '../components/Session/ConfigureSession';
import SessionButton from '../components/UI/SessionButton';

const Session = (props) => {  
  const [ hasConfigured, setHasConfigured ] = useState(false);

  const sesCtx = useContext(SessionContext);

  const toggleConfig = () => {
    setHasConfigured((prevState) => !prevState );
  }

  return (
    <Fragment>
      <div>
        Currently {sesCtx.statusText}
      </div>
      {!hasConfigured && <SessionButton onClick={toggleConfig}>Set Up Session</SessionButton>}
      {hasConfigured && <ConfigureSession/>}
      <br/>
      <Link to='/metrics'>View Metrics</Link>
      <Link to='/history'>History</Link>
    </Fragment>
  )
};

export default Session;