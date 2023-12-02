import { Link } from 'react-router-dom';
import { useStreak } from '../context/StreakContext';

const Header = () => {
	const { dailyStreak } = useStreak();

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
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'column',
					}}
				>
					<label htmlFor='daily-goal'>Daily Goal</label>
					<select>
						<option value='casual'>Casual - 10 words</option>
						<option value='regular'>Regular - 20 words</option>
						<option value='serious'>Serious - 30 words</option>
					</select>
				</div>
				Daily streak:
				<p
					style={{
						background: 'green',
						color: 'white',
						borderRadius: '5px',
						padding: '0.5rem 1.5rem',
						fontWeight: 'bold',
					}}
				>
					{dailyStreak}
				</p>
			</div>
		</div>
	);
};

export default Header;
