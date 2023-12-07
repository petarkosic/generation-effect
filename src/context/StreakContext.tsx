import { createContext, useContext, useState, useEffect } from 'react';

type TStreak = {
	dailyStreak: number;
	updateStreak: () => void;
	lastUpdatedTimestamp: number | null;
	isUpdatedToday: boolean;
};

const StreakContext = createContext<TStreak>({
	dailyStreak: 1,
	updateStreak: () => {},
	lastUpdatedTimestamp: null,
	isUpdatedToday: false,
});

export const useStreak = () => useContext(StreakContext);

export const StreakProvider = ({ children }: { children: React.ReactNode }) => {
	const [dailyStreak, setDailyStreak] = useState(1);
	const [lastUpdatedTimestamp, setLastUpdatedTimestamp] = useState<
		number | null
	>(null);
	const [isUpdatedToday, setIsUpdatedToday] = useState(false);

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

		// check if the streak was updated today
		const currentDate = new Date().toDateString();
		const lastUpdateDate = lastUpdatedTimestamp
			? new Date(lastUpdatedTimestamp).toDateString()
			: null;

		setIsUpdatedToday(currentDate === lastUpdateDate);
	}, [dailyStreak, lastUpdatedTimestamp]);

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

			setIsUpdatedToday(true);
		} else {
			setIsUpdatedToday(false);
			console.log('Streak already updated today');
		}
	};

	return (
		<StreakContext.Provider
			value={{
				dailyStreak,
				updateStreak,
				lastUpdatedTimestamp,
				isUpdatedToday,
			}}
		>
			{children}
		</StreakContext.Provider>
	);
};
