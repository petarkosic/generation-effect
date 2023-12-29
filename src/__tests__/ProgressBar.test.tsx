import { render, screen } from '@testing-library/react';
import ProgressBar from '../components/ProgressBar';
import { useStreak } from '../context/StreakContext';

vi.mock('../context/DailyGoalContext', () => ({
	useDailyGoal: vi.fn(() => ({ dailyGoal: 500 })),
}));

vi.mock('../context/StreakContext', () => ({
	useStreak: vi.fn(() => ({ dailyStreak: 10, isUpdatedToday: false })),
}));

vi.mock('../context/DailyWordsCounterContext', () => ({
	useDailyWordsCounter: vi.fn(() => ({ dailyWordsCounter: 250 })),
}));

vi.mock('../utils/getWordCountForGoal', () => ({
	getWordCountForGoal: vi.fn((goal: number) => goal * 2),
}));

describe('ProgressBar', () => {
	test('renders progress bar', async () => {
		expect.assertions(5);
		render(<ProgressBar />);

		const progressBar = screen.getByTestId('progress-bar');

		const progress = progressBar.querySelector(
			'.CircularProgressbar-path'
		) as Element;

		const streakText = screen.getByText('10');

		await new Promise((resolve) => setTimeout(resolve, 500));
		const computedStyle = window.getComputedStyle(progress);
		expect(computedStyle.getPropertyValue('stroke-dashoffset')).toBe('0px');

		expect(progressBar).toBeInTheDocument();
		expect(progress).toBeInTheDocument();
		expect(streakText).toBeInTheDocument();

		expect(
			screen.queryByText('You have completed your daily goal!')
		).not.toBeInTheDocument();
	});

	test('renders full progress bar when daily goal is reached', () => {
		expect.assertions(4);

		// Mock context values to simulate a full progress bar scenario
		vi.mocked(useStreak).mockReturnValue({
			dailyStreak: 10,
			isUpdatedToday: true,
			lastUpdatedTimestamp: 0,
			updateStreak: vi.fn(),
		});

		render(<ProgressBar />);

		const progressBar = screen.getByTestId('progress-bar');
		const progress = progressBar.querySelector(
			'.CircularProgressbar-path'
		) as Element;

		const streakText = screen.getByText('10');

		expect(progressBar).toBeInTheDocument();
		expect(progress).toBeInTheDocument();
		expect(streakText).toBeInTheDocument();

		expect(
			screen.getByText('You have completed your daily goal!')
		).toBeInTheDocument();
	});
});
