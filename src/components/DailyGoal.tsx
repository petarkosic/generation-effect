const DailyGoal = () => {
	return (
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
	);
};

export default DailyGoal;
