import { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useStreak } from '../context/StreakContext';
import { useDailyGoal } from '../context/DailyGoalContext';
import { getWordCountForGoal } from '../utils/getWordCountForGoal';
import Header from '../components/Header';

const Dashboard = () => {
	const [chartData, setChartData] = useState({
		labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		datasets: [
			{
				label: 'Daily Goal',
				fill: true,
				lineTension: 0.2,
				backgroundColor: 'rgba(0, 0, 0, 0.05)',
				borderColor: 'black',
				borderCapStyle: 'butt',
				borderJoinStyle: 'miter',
				pointBorderColor: 'black',
				pointBackgroundColor: 'black',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'black',
				pointHoverBorderColor: 'black',
				pointHoverBorderWidth: 2,
				pointStyle: false,
				pointRadius: 1,
				pointHitRadius: 100,
				data: [0, 0, 0, 0, 0, 0, 0],
			},
		],
	});

	const { isUpdatedToday } = useStreak();
	const { dailyGoal } = useDailyGoal();

	const numOfWordsForDailyStreak = useRef<number | null>();

	useEffect(() => {
		numOfWordsForDailyStreak.current = getWordCountForGoal(dailyGoal);
	}, [dailyGoal]);

	useEffect(() => {
		// Update the chart data if streak is updated today
		if (isUpdatedToday) {
			const updatedData = [...chartData.datasets[0].data];
			const dayIndex = (new Date().getDay() + 6) % 7;
			updatedData[dayIndex] = numOfWordsForDailyStreak.current || 0;
			setChartData((prevState) => ({
				...prevState,
				datasets: [{ ...prevState.datasets[0], data: updatedData }],
			}));
		}
	}, [isUpdatedToday]);

	const options = {
		responsive: true,
		plugins: {
			title: {
				display: true,
				text: 'Daily Words Completed',
			},
		},
	};

	return (
		<>
			<Header />
			<div style={{ marginTop: '50px' }}>
				<Line data={chartData} options={options} />
			</div>
		</>
	);
};

export default Dashboard;
