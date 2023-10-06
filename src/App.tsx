import { useState } from 'react';
import './App.css';

function App() {
	const [inputText, setInputText] = useState('');
	const [outputText, setOutputText] = useState('');
	const [difficulty, setDifficulty] = useState('easy');

	const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputText(event.target.value);
	};

	const generateOutputText = () => {
		const words = inputText.split(' ');

		let output = '';
		let changeWords = false;

		words.forEach((word) => {
			if (changeWords) {
				if (difficulty === 'easy') {
					// Replace only vowels with underscores
					const obscuredWord = word.replace(/[aeiouAEIOU]/g, '_');

					output += obscuredWord + ' ';
				} else if (difficulty === 'medium') {
					// Replace random letters with underscores
					const obscuredWord = word
						.split('')
						.map((char) => {
							if (Math.random() < 0.5) {
								return '_';
							}
							return char;
						})
						.join('');
					output += obscuredWord + ' ';
				} else if (difficulty === 'hard') {
					// Replace all letters except the first with underscores
					const firstLetter = word.charAt(0);
					const obscuredWord = firstLetter + '_'.repeat(word.length - 1);
					output += obscuredWord + ' ';
				}
				changeWords = false;
			} else {
				output += word + ' ';
			}

			// Check if the word is a verb
			if (['is', 'are', 'am', 'was', 'were'].includes(word.toLowerCase())) {
				changeWords = true;
			}
		});

		setOutputText(output.trim());
	};

	return (
		<div className='App'>
			<h1>Generation Effect App</h1>
			<div>
				<label>Input a Sentence or Paragraph:</label>
				<textarea
					rows={4}
					cols={50}
					value={inputText}
					onChange={handleInputChange}
				/>
			</div>
			<div>
				<label>Difficulty Level:</label>
				<select onChange={(e) => setDifficulty(e.target.value)}>
					<option value='easy'>Easy</option>
					<option value='medium'>Medium</option>
					<option value='hard'>Hard</option>
				</select>
			</div>
			<button onClick={generateOutputText}>Generate</button>
			<div>
				<label>Output Text:</label>
				<div>{outputText}</div>
			</div>
		</div>
	);
}

export default App;
