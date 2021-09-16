import { Fragment } from 'react';

import NavHeader from './header/NavHeader';

const Layout = (props) => {
	return (
		<Fragment>
			<NavHeader onlineStatus='offline' />;
			<main>{props.children}</main>
		</Fragment>
	);
};

export default Layout;
