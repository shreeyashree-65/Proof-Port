import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          {/* Navigation */}
          <nav className="bg-blue-600 p-4 text-white flex gap-4">
            <Link className="hover:underline" to="/">Home</Link>
            <Link className="hover:underline" to="/about">About</Link>
            <Link className="hover:underline" to="/dashboard">Dashboard</Link>
          </nav>

          {/* Routes */}
          <div className="p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
