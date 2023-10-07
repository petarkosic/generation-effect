import { useState } from 'react';
import './App.css';
import { generateOutput } from './utils/obfuscation';

function App() {
	const [inputText, setInputText] = useState('');
	const [outputText, setOutputText] = useState('');
	const [difficulty, setDifficulty] = useState('easy');

	const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputText(event.target.value);
	};

	const generate = () => {
		const generatedOutput = generateOutput(inputText, difficulty);
		setOutputText(generatedOutput);
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
			<button onClick={generate}>Generate</button>
			<div>
				<label>Output Text:</label>
				<div>{outputText}</div>
			</div>
		</div>
	);
}

export default App;
