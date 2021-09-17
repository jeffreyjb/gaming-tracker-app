import { Fragment, useState, useContext } from 'react';

import TimerContext from '../../store/timer-context';
//import SessionContext from '../../store/session-context';

import SessionButton from '../../components/UI/SessionButton';
import GameSelect from './GameSelect';


const ConfigureSession = (props) => {
  const [ sessionInProgress, setSessionInProgress ] = useState(false);
  const [ pauseResumeButtonTitle, setPauseResumeButtonTitle ] = useState('Pause Session');

  const tmrCtx = useContext(TimerContext);
  //const sesCtx = useContext(SessionContext);

  const startSession = () => {
    tmrCtx.resetTimer();
    tmrCtx.startTimer(1000);
    setSessionInProgress(true);
  }

  const endSession = () =>{
    tmrCtx.stopTimer();
    setSessionInProgress(false);
    setPauseResumeButtonTitle('Pause Session');
  }

  const pauseResumeHandler = () => {
    if(tmrCtx.timerIsPaused){
      tmrCtx.resumeTimer();
      setPauseResumeButtonTitle('Pause Session');
    } else {
      tmrCtx.pauseTimer();
      setPauseResumeButtonTitle('Resume Session');
    }
  }

  return (
    <Fragment>
      <GameSelect/>
      <SessionButton disabled={sessionInProgress} onClick={()=>{startSession()}}>Start Session</SessionButton>
      <SessionButton disabled={!sessionInProgress} onClick={pauseResumeHandler}>{pauseResumeButtonTitle}</SessionButton>
      <SessionButton disabled={!sessionInProgress} onClick={()=>{endSession()}}>End Session</SessionButton>
    </Fragment>
    
  );
};

export default ConfigureSession;