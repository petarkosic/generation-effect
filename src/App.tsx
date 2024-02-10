import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';

function App() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/about' element={<About />} />
				<Route path='/dashboard' element={<Dashboard />} />
			</Routes>
		</Suspense>
	);
}

export default App;
