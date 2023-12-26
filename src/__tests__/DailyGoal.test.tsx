import { render, screen, fireEvent } from '@testing-library/react';
import DailyGoal from './../components/DailyGoal';
import { DailyGoalProvider } from '../context/DailyGoalContext'; // Assuming context file location

describe('DailyGoal component', () => {
	test('renders initial daily goal from context', () => {
		const initialDailyGoal = 'regular';

		render(
			<DailyGoalProvider dailyGoal={initialDailyGoal}>
				<DailyGoal />
			</DailyGoalProvider>
		);

		const selectedOption = screen.getByText('Regular - 20 words');
		expect(selectedOption).toHaveValue('regular');
	});

	test('updates daily goal when selection changes', () => {
		const handleSelectedGoal = vi.fn();
		render(
			<DailyGoalProvider
				dailyGoal='regular'
				handleSelectedGoal={handleSelectedGoal}
			>
				<DailyGoal />
			</DailyGoalProvider>
		);

		const newGoal = 'serious';
		const selectOption = screen.getByRole('combobox');
		const optionToSelect = screen.getByText('Serious - 30 words');
		fireEvent.change(selectOption, { target: { value: newGoal } });
		expect.assertions(2);
		expect(optionToSelect).toHaveTextContent('Serious - 30 words');
		expect(screen.getByRole('option', { selected: true })).toHaveValue(newGoal);
	});
	test('updates daily goal when a new option is selected', () => {
		render(
			<DailyGoalProvider>
				<DailyGoal />
			</DailyGoalProvider>
		);

		const select = screen.getByRole('combobox') as HTMLSelectElement;

		fireEvent.change(screen.getByRole('combobox'), {
			target: { value: 'serious' },
		});

		expect(select.value).toBe('serious');
	});
});
