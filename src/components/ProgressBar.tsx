import { useEffect, useRef } from 'react';
import { useDailyGoal } from '../context/DailyGoalContext';
import { useStreak } from '../context/StreakContext';
import {
	CircularProgressbarWithChildren,
	buildStyles,
} from 'react-circular-progressbar';
import { useDailyWordsCounter } from '../context/DailyWordsCounterContext';
import { getWordCountForGoal } from '../utils/getWordCountForGoal';

const ProgressBar = () => {
	const { dailyStreak, isUpdatedToday } = useStreak();
	const { dailyGoal } = useDailyGoal();

	const { dailyWordsCounter } = useDailyWordsCounter();

	const numOfWordsForDailyStreak = useRef<number | null>();

	useEffect(() => {
		numOfWordsForDailyStreak.current = getWordCountForGoal(dailyGoal);
	}, [dailyGoal]);

	return (
		<div className='progress-bar-container' data-testid='progress-bar'>
			<CircularProgressbarWithChildren
				value={
					isUpdatedToday
						? (numOfWordsForDailyStreak.current as number)
						: dailyWordsCounter
				}
				maxValue={numOfWordsForDailyStreak.current as number}
				styles={buildStyles({
					textColor: '#000',
					pathColor: '#00ff00',
					trailColor: '#444',
					pathTransitionDuration: 0.5,
					strokeLinecap: 'round',
				})}
			>
				<div>
					<p className='daily-streak'>{dailyStreak}</p>
				</div>
			</CircularProgressbarWithChildren>
			{isUpdatedToday && (
				<p className='daily-goal-complete'>
					You have completed your daily goal!
				</p>
			)}
		</div>
	);
};

export default ProgressBar;
