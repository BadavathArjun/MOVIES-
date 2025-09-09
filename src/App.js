import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Auth from './pages/Auth';
import Lists from './pages/Lists';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserDashboard from './pages/UserDashboard';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import HelpCenter from './pages/HelpCenter';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-100">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/lists" element={<Lists />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/help" element={<HelpCenter />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
