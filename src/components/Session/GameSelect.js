import { useContext, useRef } from 'react';

import SessionContext from '../../store/session-context';


import classes from './GameSelect.module.css';

const GameSelect = () => {

  const sesCtx = useContext(SessionContext);
  const selectRef = useRef();

  const gameChangeHandler = () => {
    const currentGame = selectRef.current.options[selectRef.current.selectedIndex].text;
    sesCtx.setCurrentGame(currentGame);
  }

  return (
    <div className={classes.gameDropdown}>
      <p>Choose Game:</p>
      <select ref={selectRef} onChange={gameChangeHandler} name='game-options' defaultValue=''>
        <option value='' disabled>Please Select a Game...</option>
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </select>
    </div>
  );
};

export default GameSelect;