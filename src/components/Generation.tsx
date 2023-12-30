import { useState } from 'react';
import '../App.css';
import { generateOutput } from '../utils/obfuscation';
import { useStreak } from '../context/StreakContext';
import { useDailyGoal } from '../context/DailyGoalContext';
import { useDailyWordsCounter } from '../context/DailyWordsCounterContext';
import { getWordCountForGoal } from '../utils/getWordCountForGoal';

type TOutputText = {
	original: string;
	obfuscated: string;
	isCorrect: boolean;
};

function Generation() {
	const [inputText, setInputText] = useState('');
	const [outputText, setOutputText] = useState<TOutputText[]>();
	const [difficulty, setDifficulty] = useState('easy');
	const [error, setError] = useState('');

	const { updateStreak } = useStreak();
	const { dailyGoal } = useDailyGoal();
	const { dailyWordsCounter, updateDailyWordsCounter } = useDailyWordsCounter();

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

		const originalInputText = inputText.split(' ');
		const generatedOutput = generateOutput(inputText, difficulty);

		const words = generatedOutput.split(' ').map((word, idx) => {
			if (word.includes('_')) {
				return {
					original: originalInputText[idx],
					obfuscated: word,
					isCorrect: false,
				};
			}

			return {
				original: originalInputText[idx],
				obfuscated: word + ' ',
				isCorrect: true,
			};
		});

		setOutputText(words);
	};

	const handleKeyUp = (
		event: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) => {
		const inputValue = event.currentTarget.value;
		const isCorrect = inputValue === outputText?.[index]?.original;

		if (inputValue === outputText?.[index]?.original) {
			if (dailyWordsCounter + 1 >= getWordCountForGoal(dailyGoal)) {
				updateStreak();
				updateDailyWordsCounter(dailyWordsCounter + 1);
			} else {
				updateDailyWordsCounter(dailyWordsCounter + 1);
			}
		}

		setOutputText((prevWords) =>
			prevWords?.map((word, i) => (i === index ? { ...word, isCorrect } : word))
		);
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const inputValue = e.currentTarget.value;

		setOutputText((prevWords) =>
			prevWords?.map((word, i) =>
				i === index ? { ...word, obfuscated: inputValue } : word
			)
		);
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
						data-testid='input-text'
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
							{outputText.map((word, index) => (
								<span
									key={index}
									className={`word ${word.isCorrect ? 'correct' : 'incorrect'}`}
								>
									{word.isCorrect ? (
										word.original + ' '
									) : (
										<input
											className='obfuscated'
											value={word.obfuscated}
											onChange={(e) => handleChange(e, index)}
											onKeyUp={(e) => handleKeyUp(e, index)}
										/>
									)}
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
