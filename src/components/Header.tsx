import { Link } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import DailyGoal from './DailyGoal';

const Header = () => {
	return (
		<div className='header'>
			<Link to='/'>Home</Link>
			<Link to='/about'>About</Link>
			<div className='goal-container'>
				<DailyGoal />
				<ProgressBar />
			</div>
		</div>
	);
};

export default Header;
