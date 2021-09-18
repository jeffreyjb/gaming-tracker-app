import React from 'react';

import classes from './Button.module.css';

const SessionButton = (props) => {
  return (
    <button className={`${props.disabled && classes.disabled}`} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default SessionButton;