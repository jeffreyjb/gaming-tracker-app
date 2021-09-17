import React, { useState } from 'react';

const TimerContext = React.createContext({
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
  const [ timerHandle, setTimerHandle ] = useState(null);
  const [ isPaused, setIsPaused ] = useState(false);
  const [ currentInterval, setCurrentInterval ] = useState(1000);

  const startTimerHandler = (intervalValue=1000) => {
    setCurrentInterval(intervalValue);
    const timerIntervalPtr = setInterval(()=>{
      setTimer((prevState)=>{return prevState + (intervalValue/1000);});
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
      setTimer((prevState)=>{return prevState + (currentInterval/1000);});
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
  }

	return (
		<TimerContext.Provider
			value={{
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