import { Link } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import DailyGoal from './DailyGoal';

const Header = () => {
	return (
		<div className='header'>
			<Link to='/'>Home</Link>
			<Link to='/about'>About</Link>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					gap: '1rem',
					marginLeft: 'auto',
				}}
			>
				<DailyGoal />
				<ProgressBar />
			</div>
		</div>
	);
};

export default Header;
