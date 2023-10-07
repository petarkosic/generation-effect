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

// Create a function that generates obfuscated output
export function generateOutput(inputText: string, difficulty: string): string {
	const words = inputText.split(' ');
	let output = '';
	let changeWords = false;

	const obfuscationStrategy = getObfuscationStrategy(difficulty);

	words.forEach((word) => {
		if (changeWords) {
			const obscuredWord = obfuscationStrategy.obfuscate(word);
			output += obscuredWord + ' ';
			changeWords = false;
		} else {
			output += word + ' ';
		}

		if (['is', 'are', 'am', 'was', 'were'].includes(word.toLowerCase())) {
			changeWords = true;
		}
	});

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
