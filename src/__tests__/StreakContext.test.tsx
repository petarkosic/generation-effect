import {
	act,
	render,
	renderHook,
	screen,
	waitFor,
} from '@testing-library/react';
import { StreakProvider, useStreak } from '../context/StreakContext';

vi.mock('../utils/obfuscation', () => ({
	generateOutput: vi.fn(),
}));

vi.mock('../context/DailyGoalContext', () => ({
	useDailyGoal: vi.fn(() => ({ dailyGoal: 500 })),
}));

vi.mock('../context/StreakContext', () => ({
	useStreak: vi.fn(() => ({
		dailyStreak: 10,
		isUpdatedToday: false,
		updateStreak: vi.fn(),
		lastUpdatedTimestamp: null,
	})),
	StreakProvider: vi.fn(({ children }) => children),
}));

vi.mock('../context/DailyWordsCounterContext', () => ({
	useDailyWordsCounter: vi.fn(() => ({ dailyWordsCounter: 250 })),
}));

vi.mock('../utils/getWordCountForGoal', () => ({
	// return 10 for casual goal
	getWordCountForGoal: vi.fn(() => 10),
}));

vi.mock('localStorage', () => ({
	getItem: vi.fn(() => null),
	setItem: vi.fn(),
	removeItem: vi.fn(),
	clear: vi.fn(),
}));

describe('StreakProvider', () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	test('outputs initial values from localStorage', () => {
		localStorage.setItem('dailyStreak', '1');
		localStorage.setItem('dailyGoal', 'casual');

		render(
			<StreakProvider>
				<div>
					<p>Daily Streak: {localStorage.getItem('dailyStreak')}</p>
					<p>Daily Goal: {localStorage.getItem('dailyGoal')}</p>
				</div>
			</StreakProvider>
		);

		const { getByText } = screen;
		expect(getByText('Daily Streak: 1')).toBeInTheDocument();
		expect(getByText('Daily Goal: casual')).toBeInTheDocument();
		expect(localStorage.getItem('dailyStreak')).toBe('1');
		expect(localStorage.getItem('dailyGoal')).toBe('casual');
	});

	test('updates streak', async () => {
		vi.mocked(useStreak).mockReturnValue({
			dailyStreak: 11,
			isUpdatedToday: true,
			lastUpdatedTimestamp: 0,
			updateStreak: vi.fn(),
		});

		const { result } = renderHook(() => useStreak());

		act(() => result.current.updateStreak());

		await waitFor(() => {
			expect(result.current.updateStreak).toBeCalledTimes(1);
			expect(result.current.dailyStreak).toBe(11);
			expect(result.current.isUpdatedToday).toBe(true);
		});
	});
});
