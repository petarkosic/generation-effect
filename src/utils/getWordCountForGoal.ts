export const getWordCountForGoal = (goal: string): number => {
	const wordCounts: Record<string, number> = {
		casual: 15,
		regular: 30,
		serious: 50,
	};

	return wordCounts[goal] ?? 0;
};
