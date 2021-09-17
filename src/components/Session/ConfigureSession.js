import { Fragment, useState, useContext } from 'react';

import TimerContext from '../../store/timer-context';
import SessionContext from '../../store/session-context';

import SessionButton from '../../components/UI/SessionButton';
import GameSelect from './GameSelect';


const ConfigureSession = () => {
  const [ pauseResumeButtonTitle, setPauseResumeButtonTitle ] = useState('Pause Session');
  const [ validGame, setIsValidGame ] = useState(true);

  const tmrCtx = useContext(TimerContext);
  const sesCtx = useContext(SessionContext);

  const warningText = <p style={{color: 'red'}}>Please select a valid game!!</p>;

  const startSession = () => {
    if(sesCtx.currentGame === ''){
      setIsValidGame(false);
      console.log('nailed it');
      return;
    }

    setIsValidGame(true);

    tmrCtx.resetTimer();
    tmrCtx.startTimer(1000);

    sesCtx.setIsPlaying(true);
    sesCtx.setStatusText('Playing: ' + sesCtx.currentGame);
  }

  const endSession = () =>{
    tmrCtx.stopTimer();
    setPauseResumeButtonTitle('Pause Session');

    sesCtx.setIsPlaying(false);
    sesCtx.setStatusText('offline');
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
      {!validGame && warningText}
      <SessionButton disabled={sesCtx.isPlaying} onClick={()=>{startSession()}}>Start Session</SessionButton>
      <SessionButton disabled={!sesCtx.isPlaying} onClick={pauseResumeHandler}>{pauseResumeButtonTitle}</SessionButton>
      <SessionButton disabled={!sesCtx.isPlaying} onClick={()=>{endSession()}}>End Session</SessionButton>
    </Fragment>
    
  );
};

export default ConfigureSession;