import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DailyGoal from './../components/DailyGoal';
import { DailyGoalProvider } from '../context/DailyGoalContext';

describe('DailyGoal component', () => {
	test('renders initial daily goal from context', () => {
		render(
			<DailyGoalProvider>
				<DailyGoal />
			</DailyGoalProvider>
		);

		const selectedOption = screen.getByText('Regular - 20 words');
		expect(selectedOption).toHaveValue('regular');
	});

	test('updates daily goal when selection changes', async () => {
		expect.assertions(2);

		render(
			<DailyGoalProvider>
				<DailyGoal />
			</DailyGoalProvider>
		);

		const initialGoal = 'casual';
		expect(screen.getByRole('option', { selected: true })).toHaveValue(
			initialGoal
		);

		const newGoal = 'serious';
		const selectOption = screen.getByRole('combobox') as HTMLSelectElement;

		await userEvent.selectOptions(selectOption, newGoal);

		expect(screen.getByRole('option', { selected: true })).toHaveValue(newGoal);
	});
});
