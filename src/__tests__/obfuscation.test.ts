import { generateOutput } from '../utils/obfuscation';

describe('generateOutput', () => {
	it('should return the input text when difficulty is easy', () => {
		const inputText = 'The quick brown fox is jumping over the lazy dog.';
		const difficulty = 'easy';
		const outputText = 'The q__ck brown fox is j_mp_ng over the l_zy dog.';
		const result = generateOutput(inputText, difficulty);
		expect(result).toBe(outputText);
	});

	it('should return the input text when difficulty is hard', () => {
		const inputText = 'The quick brown fox is jumping over the lazy dog.';
		const difficulty = 'hard';
		const outputText = 'The q____ brown fox is j______ over the l___ dog.';
		const result = generateOutput(inputText, difficulty);
		expect(result).toBe(outputText);
	});

	it('should handle edge cases when there are no next words', () => {
		const inputText = 'Word.';
		const difficulty = 'easy';
		const result = generateOutput(inputText, difficulty);
		expect(result).toBe(inputText);
	});

	it('should handle empty input text', () => {
		const inputText = '';
		const difficulty = 'easy';
		const result = generateOutput(inputText, difficulty);
		expect(result).toBe('');
	});
});
