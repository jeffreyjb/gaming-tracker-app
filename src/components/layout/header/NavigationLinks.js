import { NavLink } from 'react-router-dom';

import classes from './NavigationLinks.module.css';

const NavigationLinks = (props) => {
	return (
		<nav className={classes.nav}>
			<ul>
				<li>
					<NavLink activeClassName={classes.active} to='/session'>
						Session
					</NavLink>
				</li>
				<li>
					<NavLink activeClassName={classes.active} to='/history'>
						History
					</NavLink>
				</li>
				<li>
					<NavLink activeClassName={classes.active} to='/metrics'>
						Metrics
					</NavLink>
				</li>
				<li>
					<NavLink activeClassName={classes.active} to='/manage-games'>
						Manage
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default NavigationLinks;
