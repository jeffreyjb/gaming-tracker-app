import { Fragment } from 'react'
import { Link } from 'react-router-dom';

import ConfigureSession from '../components/Session/ConfigureSession';
import SessionHeader from '../components/Session/SessionHeader';

const Session = (props) => {  
  return (
    <Fragment>
      <SessionHeader/>
      <ConfigureSession/>
      <br/>
      <Link to='/metrics'>View Metrics</Link>
      <Link to='/history'>History</Link>
    </Fragment>
  )
};

export default Session;