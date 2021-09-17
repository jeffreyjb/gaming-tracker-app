import React from 'react';

import classes from './SessionButton.module.css';

const SessionButton = (props) => {
  return (
    <button className={`${props.disabled && classes.disabled}`} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default SessionButton;