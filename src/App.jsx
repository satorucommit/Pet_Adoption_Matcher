// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import AdopterPage from './pages/AdopterPage';
import ShelterPage from './pages/ShelterPage';
import Preloader from './components/common/Preloader';
import './App.css'; // You can keep this for any app-specific styles

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Add class to body when loading is complete
  useEffect(() => {
    if (!isLoading) {
      document.body.classList.add('loaded');
    }
  }, [isLoading]);

  return (
    <Router>
      {isLoading && (
        <Preloader onLoadingComplete={handleLoadingComplete} />
      )}
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/adopter" element={<AdopterPage />} />
            <Route path="/shelter" element={<ShelterPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;