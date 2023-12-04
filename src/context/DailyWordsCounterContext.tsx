import { createContext, useContext, useState } from 'react';

type TDailyWordCounter = {
	dailyWordsCounter: number;
	updateDailyWordsCounter: (value?: number) => void;
};

const DailyWordsCounterContext = createContext<TDailyWordCounter>({
	dailyWordsCounter: 0,
	updateDailyWordsCounter: () => {},
});

export const useDailyWordsCounter = () => useContext(DailyWordsCounterContext);

export const DailyWordsCounterProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [dailyWordsCounter, setDailyWordsCounter] = useState(0);

	const updateDailyWordsCounter = (value?: number) => {
		setDailyWordsCounter((prev: number) =>
			value !== undefined ? value : prev + 1
		);
	};

	return (
		<DailyWordsCounterContext.Provider
			value={{
				dailyWordsCounter,
				updateDailyWordsCounter,
			}}
		>
			{children}
		</DailyWordsCounterContext.Provider>
	);
};
