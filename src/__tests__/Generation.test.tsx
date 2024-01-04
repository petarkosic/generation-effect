import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Generation from './../components/Generation';
import { generateOutput } from '../utils/obfuscation';

vi.mock('../utils/obfuscation', () => ({
	generateOutput: vi.fn(),
}));

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
	// return 10 for casual goal
	getWordCountForGoal: vi.fn(() => 10),
}));

describe('Generation', () => {
	afterEach(() => {
		(screen.getByTestId('input-text') as HTMLTextAreaElement).value = '';
	});

	test('initial state', () => {
		render(<Generation />);

		expect(
			screen.getByText('Input a Sentence or Paragraph:')
		).toBeInTheDocument();
		expect(screen.getByText('Difficulty Level:')).toBeInTheDocument();
		expect(screen.getByText('Generate')).toBeInTheDocument();
		expect(
			screen.queryByText('Please enter a sentence or paragraph.')
		).not.toBeInTheDocument();
		expect(screen.queryByText('Output Text:')).not.toBeInTheDocument();
	});

	test('input text updates', async () => {
		render(<Generation />);
		const input = screen.getByTestId('input-text') as HTMLTextAreaElement;
		userEvent.type(input, 'This is a test sentence.');
		await waitFor(() => {
			expect(input.value).toBe('This is a test sentence.');
		});
	});

	test('generate button renders output text', async () => {
		vi.mocked(generateOutput).mockReturnValue('This is a t_st sentence.');

		render(<Generation />);
		const input = screen.getByTestId('input-text') as HTMLTextAreaElement;

		const testSentence = 'This is a test sentence.';
		const difficulty = 'easy';

		await userEvent.type(input, testSentence);
		await userEvent.click(screen.getByRole('button', { name: 'Generate' }));

		expect(screen.getByText('Output Text:')).toBeInTheDocument();
		expect(generateOutput(testSentence, difficulty)).toBe(
			'This is a t_st sentence.'
		);
	});

	test('generate button renders output text according to difficulty', async () => {
		const mockReturnValues: Record<string, string> = {
			easy: 'This is a t_st sentence.',
			medium: 'This is a se_ten__.',
			hard: 'Th_s _s _ t_st s_nt_nc_.',
		};

		vi.mocked(generateOutput).mockImplementation((sentence, difficulty) => {
			return mockReturnValues[difficulty];
		});

		render(<Generation />);
		const input = screen.getByTestId('input-text') as HTMLTextAreaElement;

		const testSentence = 'This is a test sentence.';
		const difficultyLevels = ['easy', 'medium', 'hard'];

		for (const difficulty of difficultyLevels) {
			await userEvent.clear(input);
			await userEvent.type(input, testSentence);

			await userEvent.click(screen.getByRole('button', { name: 'Generate' }));

			await waitFor(() => {
				expect(screen.getByText('Output Text:')).toBeInTheDocument();
			});

			expect(generateOutput(testSentence, difficulty)).toBe(
				mockReturnValues[difficulty]
			);
		}
	});

	test('error message for empty input', async () => {
		render(<Generation />);
		userEvent.click(screen.getByRole('button', { name: 'Generate' }));
		await waitFor(() => {
			expect(
				screen.getByText('Please enter a sentence or paragraph.')
			).toBeInTheDocument();
		});
	});
});
