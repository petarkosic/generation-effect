import { useStreak } from '../context/StreakContext';
import {
	CircularProgressbarWithChildren,
	buildStyles,
} from 'react-circular-progressbar';

const ProgressBar = () => {
	const { dailyStreak } = useStreak();

	return (
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
	);
};

export default ProgressBar;
