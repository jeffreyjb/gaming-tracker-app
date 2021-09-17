import { Fragment } from 'react';

import NavHeader from './header/NavHeader';

import classes from './Layout.module.css';

const Layout = (props) => {
	return (
		<Fragment>
			<NavHeader onlineStatus='offline' />
			<main className={classes.main}>{props.children}</main>
		</Fragment>
	);
};

export default Layout;
