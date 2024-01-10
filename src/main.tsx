import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { StreakProvider } from './context/StreakContext';
import { DailyGoalProvider } from './context/DailyGoalContext';
import { DailyWordsCounterProvider } from './context/DailyWordsCounterContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<StreakProvider>
				<DailyGoalProvider>
					<DailyWordsCounterProvider>
						<App />
					</DailyWordsCounterProvider>
				</DailyGoalProvider>
			</StreakProvider>
		</BrowserRouter>
	</React.StrictMode>
);
