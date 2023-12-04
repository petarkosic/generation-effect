export const getWordCountForGoal = (goal: string): number => {
	switch (goal) {
		case 'casual':
			return 10;
		case 'regular':
			return 20;
		case 'serious':
			return 30;
		default:
			return 0;
	}
};
