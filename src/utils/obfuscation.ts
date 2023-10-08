interface ObfuscationStrategy {
	obfuscate(word: string): string;
}

class EasyObfuscationStrategy implements ObfuscationStrategy {
	obfuscate(word: string): string {
		// Replace only vowels with underscores
		return word.replace(/[aeiouAEIOU]/g, '_');
	}
}

class MediumObfuscationStrategy implements ObfuscationStrategy {
	obfuscate(word: string): string {
		// Replace random letters with underscores
		return word
			.split('')
			.map((char) => (Math.random() < 0.5 ? '_' : char))
			.join('');
	}
}

class HardObfuscationStrategy implements ObfuscationStrategy {
	obfuscate(word: string): string {
		// Replace all letters except the first with underscores
		const firstLetter = word.charAt(0);
		return firstLetter + '_'.repeat(word.length - 1);
	}
}

export function generateOutput(inputText: string, difficulty: string): string {
	const words = inputText.split(' ');
	let output = '';

	const obfuscationStrategy = getObfuscationStrategy(difficulty);

	const isArticle = (word: string) =>
		['a', 'an', 'the'].includes(word.toLowerCase());
	const isVerb = (word: string) =>
		['is', 'are', 'am', 'was', 'were'].includes(word.toLowerCase());

	for (let i = 0; i < words.length; i++) {
		const currentWord = words[i];
		const nextWord = words[i + 1];

		if (isVerb(currentWord) && !isArticle(nextWord)) {
			const obscuredWord = obfuscationStrategy.obfuscate(nextWord);
			output += currentWord + ' ' + obscuredWord + ' ';
		}

		if (isVerb(currentWord) && isArticle(nextWord) && words[i + 2]) {
			const obscuredWord = obfuscationStrategy.obfuscate(words?.[i + 2]);
			output += currentWord + ' ' + nextWord + ' ' + obscuredWord + ' ';
		}

		if (isVerb(currentWord) && isArticle(nextWord) && !words[i + 2]) {
			output += currentWord + ' ' + nextWord + ' ';
		}
	}

	return output.trim();
}

export function getObfuscationStrategy(
	difficulty: string
): ObfuscationStrategy {
	switch (difficulty) {
		case 'medium':
			return new MediumObfuscationStrategy();
		case 'hard':
			return new HardObfuscationStrategy();
		default:
			return new EasyObfuscationStrategy();
	}
}
