import { Link } from 'react-router-dom';
import { useStreak } from '../context/StreakContext';

const Header = () => {
	const { dailyStreak } = useStreak();

	return (
		<div className='header'>
			<Link to='/'>Home</Link>
			<Link to='/about'>About</Link>
			<p>Daily streak: {dailyStreak}</p>
		</div>
	);
};

export default Header;
