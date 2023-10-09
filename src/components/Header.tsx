import { Link, useLocation } from 'react-router-dom';

const Header = () => {
	const location = useLocation();

	return (
		<div>
			{location.pathname === '/' && <Link to='/about'>About</Link>}
			{location.pathname === '/about' && <Link to='/'>Home</Link>}
		</div>
	);
};

export default Header;
