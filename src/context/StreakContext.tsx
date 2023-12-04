import { createContext, useContext, useState, useEffect } from 'react';

type TStreak = {
	dailyStreak: number;
	updateStreak: () => void;
	lastUpdatedTimestamp: number | null;
};

const StreakContext = createContext<TStreak>({
	dailyStreak: 1,
	updateStreak: () => {},
	lastUpdatedTimestamp: null,
});

export const useStreak = () => useContext(StreakContext);

export const StreakProvider = ({ children }: { children: React.ReactNode }) => {
	const [dailyStreak, setDailyStreak] = useState(1);
	const [lastUpdatedTimestamp, setLastUpdatedTimestamp] = useState<
		number | null
	>(null);

	useEffect(() => {
		const dailyStreakFromLocalStorage = localStorage.getItem('dailyStreak');
		const lastUpdatedTimestampFromLocalStorage = localStorage.getItem(
			'lastUpdatedTimestamp'
		);

		if (dailyStreakFromLocalStorage) {
			setDailyStreak(parseInt(dailyStreakFromLocalStorage));
		}

		if (lastUpdatedTimestampFromLocalStorage) {
			setLastUpdatedTimestamp(parseInt(lastUpdatedTimestampFromLocalStorage));
		}
	}, [dailyStreak]);

	const updateStreak = () => {
		const currentTimeStamp = new Date().getTime();

		// check whether the current time is more than 24 hours (24 * 60 * 60 * 1000 milliseconsds) from the last updated timestamp
		if (
			!lastUpdatedTimestamp ||
			currentTimeStamp - lastUpdatedTimestamp > 24 * 60 * 60 * 1000
		) {
			setLastUpdatedTimestamp(currentTimeStamp);
			localStorage.setItem('lastUpdatedTimestamp', String(currentTimeStamp));

			setDailyStreak((prevStreak) => prevStreak + 1);
			localStorage.setItem('dailyStreak', String(dailyStreak + 1));
		} else {
			console.log('Streak already updated today');
		}
	};

	return (
		<StreakContext.Provider
			value={{ dailyStreak, updateStreak, lastUpdatedTimestamp }}
		>
			{children}
		</StreakContext.Provider>
	);
};
