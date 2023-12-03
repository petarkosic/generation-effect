import { Link } from 'react-router-dom';
import { useStreak } from '../context/StreakContext';
import {
	CircularProgressbarWithChildren,
	buildStyles,
} from 'react-circular-progressbar';

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

				<div style={{ width: '50px' }}>
					<CircularProgressbarWithChildren
						value={4}
						maxValue={10}
						styles={buildStyles({
							textColor: '#000',
							pathColor: '#00ff00',
							trailColor: '#444',
							pathTransitionDuration: 0.5,
							strokeLinecap: 'round',
						})}
					>
						<div>
							<p
								style={{
									marginTop: '-5px',
									fontWeight: 'bold',
								}}
							>
								{dailyStreak}
							</p>
						</div>
					</CircularProgressbarWithChildren>
				</div>
			</div>
		</div>
	);
};

export default Header;
