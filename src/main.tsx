import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { StreakProvider } from './context/StreakContext.tsx';
import { DailyGoalProvider } from './context/DailyGoalContext.tsx';
import { DailyWordsCounterProvider } from './context/DailyWordsCounterContext.tsx';

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
