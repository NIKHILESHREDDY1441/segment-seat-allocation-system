import React, { useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { AppRoutes } from './routes';
import { initStorage } from './services/storageService';

import './styles/global.css';
import './styles/components.css';
import './styles/seatmap.css';

export function App() {
  useEffect(() => {
    initStorage();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <BookingProvider>
          <Navbar />
          <AppRoutes />
          <Footer />
        </BookingProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
