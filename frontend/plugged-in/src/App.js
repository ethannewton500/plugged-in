import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import AppRoutes from './routes/AppRoutes';
import './App.css';
import { AuthProvider } from 'context/AuthContext';

function App() {
	return (
		<AuthProvider>
			<Router>
				<div>
					<Header />
					<Nav />
					<div>
						<AppRoutes />
					</div>
				</div>
			</Router>
		</AuthProvider>
	);
}

export default App;
