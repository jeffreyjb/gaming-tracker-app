import { NavLink } from 'react-router-dom';

import classes from './NavigationLinks.module.css';

const NavigationLinks = (props) => {
	return (
		<nav className={classes.nav}>
			<ul>
				<li>
					<NavLink to='/session'>Session</NavLink>
				</li>
				<li>
					<NavLink to='/metrics'>Metrics</NavLink>
				</li>
				<li>
					<NavLink to='/manage-games'>Manage Games</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default NavigationLinks;
