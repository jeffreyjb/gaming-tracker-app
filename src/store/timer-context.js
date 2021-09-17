import React, { useState } from 'react';

const TimerContext = React.createContext({
	timer: '00:00:00',
  timerVal: 0,
  timerIsPaused: false,
  startTimer: (intervalValue=1000)=>{},
  pauseTimer: ()=>{},
  resumeTimer: ()=>{},
  stopTimer: () =>{},
  resetTimer: ()=>{}
});

export const TimerContextProvider = (props) => {
	const [ timer, setTimer ] = useState(0);
  const [ timerString, setTimerString ] = useState('00:00:00');
  const [ timerHandle, setTimerHandle ] = useState(null);
  const [ isPaused, setIsPaused ] = useState(false);
  const [ currentInterval, setCurrentInterval ] = useState(1000);

  const timerToString = (val) => {

    let currVal = val;
    let hrs, min, sec;
    let hrsStr, minStr, secStr;

    // hrs
    if(currVal>=3600){
      hrs = parseInt(currVal/3600);
      if(hrs >= 10){
        hrsStr = hrs.toString();
      } else {
        hrsStr = '0' + hrs.toString();
      }
      currVal -= hrs*3600;
    } else {
      hrsStr = '00';
    }

    if(currVal>=60){
      min = parseInt(currVal/60);
      if (min >= 10){
        minStr = min.toString();
      } else {
        minStr = '0' + min.toString();
      }
      currVal -= min*60;
    } else {
      minStr = '00';
    }

    sec = currVal;
    if(sec >= 10) {
      secStr = sec.toString();
    } else if (sec > 0){
      secStr = '0' + sec.toString();
    } else {
      secStr = '00';
    }

    setTimerString(hrsStr + ':' + minStr + ':' + secStr);

  };

  const startTimerHandler = (intervalValue=1000) => {
    setCurrentInterval(intervalValue);
    const timerIntervalPtr = setInterval(()=>{
      setTimer((prevState)=>{
        timerToString(prevState + (intervalValue/1000));
        return prevState + (intervalValue/1000);
      });
      
    }, intervalValue );
    setTimerHandle(timerIntervalPtr);
  }

  const pauseTimerHandler = () => {
    if(!timerHandle){
      return;
    }
    setIsPaused(true);
    clearInterval(timerHandle);
    setTimerHandle(null);
  }

  const resumeTimerHandler = () => {
    if(timerHandle){
      return;
    }
    setIsPaused(false);

    const timerIntervalPtr = setInterval(()=>{
      setTimer((prevState)=>{
        timerToString(prevState + (currentInterval/1000));
        return prevState + (currentInterval/1000);
      });
    }, currentInterval );
    setTimerHandle(timerIntervalPtr);
  }

  const stopTimerHandler = () => {
    if(!timerHandle){
      return;
    }
    clearInterval(timerHandle);
    setTimerHandle(null);
  }

  const resetTimerHandler = () => {
    if(timerHandle){
      clearInterval(timerHandle);
      setTimerHandle(null);
    }
    setTimer(0);
    setTimerString('00:00:00');
  }

	return (
		<TimerContext.Provider
			value={{
        timer: timerString,
				timerVal: timer,
        timerIsPaused: isPaused,
        startTimer: startTimerHandler,
        pauseTimer: pauseTimerHandler,
        resumeTimer: resumeTimerHandler,
        stopTimer: stopTimerHandler,
        resetTimer: resetTimerHandler
			}}>
			{props.children}
		</TimerContext.Provider>
	);
};

export default TimerContext;