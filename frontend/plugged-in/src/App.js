import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Nav />
        <div>
          <AppRoutes />
        </div>
      </div>
    </Router>
  );
}

export default App;
