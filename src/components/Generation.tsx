import { useState } from 'react';
import '../App.css';
import { generateOutput } from '../utils/obfuscation';

function Generation() {
	const [inputText, setInputText] = useState('');
	const [outputText, setOutputText] = useState<(string | JSX.Element)[]>();
	const [difficulty, setDifficulty] = useState('easy');
	const [error, setError] = useState('');

	const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputText(event.target.value);
	};

	const generate = () => {
		if (inputText.length === 0) {
			setError('Please enter a sentence or paragraph.');

			setTimeout(() => {
				setError('');
				setOutputText([]);
			}, 3000);
		}
		const generatedOutput = generateOutput(inputText, difficulty);
		const words = generatedOutput.split(' ').map((word) => {
			if (word.includes('_')) {
				return <span className='obfuscated'>{word} </span>;
			}
			return word + ' ';
		});

		setOutputText(words);
	};

	return (
		<>
			<div className='App'>
				<h1>Generation Effect</h1>
				<div className='input'>
					<label>Input a Sentence or Paragraph:</label>
					<textarea
						rows={6}
						cols={30}
						value={inputText}
						onChange={handleInputChange}
					/>
				</div>
				<div className='difficulty'>
					<label>Difficulty Level:</label>
					<select onChange={(e) => setDifficulty(e.target.value)}>
						<option value='easy'>Easy</option>
						<option value='medium'>Medium</option>
						<option value='hard'>Hard</option>
					</select>
				</div>
				<button className='button-generate' onClick={generate}>
					Generate
				</button>
				{error && <p className='error'>{error}</p>}
				{outputText && !error && (
					<div className='output'>
						<label>Output Text:</label>
						<div>
							{outputText.map((element, index) => (
								<span key={index} className='word'>
									{element}
								</span>
							))}
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default Generation;
