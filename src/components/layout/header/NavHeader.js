import classes from './NavHeader.module.css';

import NavigationLinks from './NavigationLinks';
import SessionStatus from './SessionStatus';

const NavHeader = (props) => {
	return (
		<header className={classes.header}>
			<NavigationLinks />
			<SessionStatus />
		</header>
	);
};

export default NavHeader;
