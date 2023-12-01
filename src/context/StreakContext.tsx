import { createContext, useContext, useState, useEffect } from 'react';

type TStreak = {
	dailyStreak: number;
	updateStreak: () => void;
};

const StreakContext = createContext<TStreak>({
	dailyStreak: 1,
	updateStreak: () => {},
});

export const useStreak = () => useContext(StreakContext);

export const StreakProvider = ({ children }: { children: React.ReactNode }) => {
	const [dailyStreak, setDailyStreak] = useState(1);

	useEffect(() => {
		const dailyStreakFromLocalStorage = localStorage.getItem('dailyStreak');

		if (dailyStreakFromLocalStorage) {
			setDailyStreak(parseInt(dailyStreakFromLocalStorage));
		}
	}, [dailyStreak]);

	const updateStreak = () => {
		// TODO: update the streak
		setDailyStreak((prevStreak) => prevStreak + 1);
		localStorage.setItem('dailyStreak', String(dailyStreak + 1));
	};

	return (
		<StreakContext.Provider value={{ dailyStreak, updateStreak }}>
			{children}
		</StreakContext.Provider>
	);
};
