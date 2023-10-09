import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';

function App() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/about' element={<About />} />
			</Routes>
		</Suspense>
	);
}

export default App;
