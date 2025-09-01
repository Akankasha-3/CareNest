import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import HomeNursingPage from './pages/HomeNursingPage';
import AdoptionPage from './pages/AdoptionPage';
import CompanionshipPage from './pages/CompanionshipPage';
import AuthPage from './pages/AuthPage';
import PaymentPage from './pages/PaymentPage';
import { api } from './utils/api';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = api.isAuthenticated();
      const userData = api.getCurrentUserFromStorage();
      
      setIsAuthenticated(authenticated);
      setUser(userData);
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  useEffect(() => {
    const handleNavigation = () => {
      const path = window.location.pathname;
      
      const routes = {
        '/': 'home',
        '/home': 'home',
        '/home-nursing': 'home-nursing',
        '/adoption': 'adoption',
        '/companionship': 'companionship',
        '/login': 'auth',
        '/signup': 'auth',
        '/auth': 'auth',
        '/payment': 'payment'
      };

      const page = routes[path] || 'home';
      setCurrentPage(page);
    };

    handleNavigation();
    window.addEventListener('popstate', handleNavigation);

    return () => {
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);

  useEffect(() => {
    const handleLinkClick = (e) => {
      const target = e.target;
      const anchor = target.closest('a');
      
      if (anchor && anchor.getAttribute('href')?.startsWith('/')) {
        e.preventDefault();
        const href = anchor.getAttribute('href') || '/';
        
        window.history.pushState({}, '', href);
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    document.addEventListener('click', handleLinkClick);
    
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'home-nursing':
        return <HomeNursingPage />;
      case 'adoption':
        return <AdoptionPage />;
      case 'companionship':
        return <CompanionshipPage />;
      case 'auth':
        if (isAuthenticated) {
          setTimeout(() => {
            window.history.pushState({}, '', '/');
            setCurrentPage('home');
          }, 0);
          return (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p>Redirecting...</p>
              </div>
            </div>
          );
        }
        return <AuthPage />;
      case 'payment':
        return <PaymentPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderPage()}
    </div>
  );
}

export default App;