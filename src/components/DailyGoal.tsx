import { useDailyGoal } from '../context/DailyGoalContext';

const DailyGoal = () => {
	const { dailyGoal, updateDailyGoal } = useDailyGoal();

	const handleSelectedGoal = (event: React.ChangeEvent<HTMLSelectElement>) => {
		updateDailyGoal(event.target.value);
	};

	return (
		<div className='daily-goal'>
			<label htmlFor='daily-goal'>Daily Goal</label>
			<select
				className='daily-goal-select'
				value={dailyGoal}
				onChange={handleSelectedGoal}
			>
				<option value='casual'>Casual - 10 words</option>
				<option value='regular'>Regular - 20 words</option>
				<option value='serious'>Serious - 30 words</option>
			</select>
		</div>
	);
};

export default DailyGoal;
