import React from 'react';

import classes from './Button.module.css';

const SessionButton = (props) => {
	return (
		<button
			className={`${classes.buttonStyle} ${props.parentClassName} ${props.disabled &&
				classes.disabled}`}
			type={props.type ? props.type : 'button'}
			onClick={props.onClick}>
			{props.children}
		</button>
	);
};

export default SessionButton;
