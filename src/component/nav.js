import { Link } from 'react-router-dom';

import './nav.scss';

const Navigation = (props) => {
	return (
		<nav>
			<div className='logo'>LOGO</div>
			<ul>
				<li>
					<Link to='/'>Strona główna</Link>
				</li>
				{props.userLogin ? (
					<li>
						<Link onClick={props.logout}>Wyloguj</Link>
					</li>
				) : (
					<li>
						<Link to='login'>Zaloguj</Link>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Navigation;
