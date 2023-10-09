import { useState } from 'react';
import '../App.css';
import { generateOutput } from '../utils/obfuscation';
import Header from '../components/Header';

function Home() {
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
		<>
			<Header />
			<div className='App'>
				<h1>Generation Effect App</h1>
				<div className='input'>
					<label>Input a Sentence or Paragraph:</label>
					<textarea
						rows={12}
						cols={80}
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
				{outputText && (
					<div className='output'>
						<label>Output Text:</label>
						<div>{outputText}</div>
					</div>
				)}
			</div>
		</>
	);
}

export default Home;
