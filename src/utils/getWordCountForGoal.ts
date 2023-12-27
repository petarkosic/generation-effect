export const getWordCountForGoal = (goal: string): number => {
	const wordCounts: Record<string, number> = {
		casual: 10,
		regular: 20,
		serious: 30,
	};

	return wordCounts[goal] ?? 0;
};
