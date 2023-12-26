import { createContext, useContext, useEffect, useState } from 'react';

type TDailyGoal = {
	dailyGoal: string;
	updateDailyGoal: (newDailyGoal: string) => void;
};

export const DailyGoalContext = createContext<TDailyGoal>({
	dailyGoal: '',
	updateDailyGoal: () => {},
});

export const useDailyGoal = () => useContext(DailyGoalContext);

export const DailyGoalProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const storedDailyGoal = localStorage.getItem('dailyGoal');
	const intialDailyGoal = storedDailyGoal || 'casual';
	const [dailyGoal, setDailyGoal] = useState(intialDailyGoal);

	const updateDailyGoal = (newDailyGoal: string) => {
		setDailyGoal(newDailyGoal);
		localStorage.setItem('dailyGoal', newDailyGoal);
	};

	useEffect(() => {
		localStorage.setItem('dailyGoal', dailyGoal);
	}, [dailyGoal]);

	return (
		<DailyGoalContext.Provider value={{ dailyGoal, updateDailyGoal }}>
			{children}
		</DailyGoalContext.Provider>
	);
};
