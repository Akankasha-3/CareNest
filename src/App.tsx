import React from 'react';
import HomePage from './pages/HomePage';
import HomeNursingPage from './pages/HomeNursingPage';
import AdoptionPage from './pages/AdoptionPage';
import CompanionshipPage from './pages/CompanionshipPage';
import AuthPage from './pages/AuthPage';
import PaymentPage from './pages/PaymentPage';
import { api } from './utils/api';

function App() {
  const [currentPage, setCurrentPage] = React.useState<string>('home');
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<any>(null);

  // Check authentication status on app load
  React.useEffect(() => {
    const checkAuth = () => {
      const authenticated = api.isAuthenticated();
      const userData = api.getCurrentUserFromStorage();
      
      setIsAuthenticated(authenticated);
      setUser(userData);
    };

    checkAuth();
    
    // Listen for storage changes (login/logout in other tabs)
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  // Handle navigation
  React.useEffect(() => {
    const handleNavigation = () => {
      const path = window.location.pathname;
      const searchParams = new URLSearchParams(window.location.search);
      
      // Route mapping
      const routes: { [key: string]: string } = {
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

    // Handle initial navigation
    handleNavigation();
    
    // Listen for browser navigation
    window.addEventListener('popstate', handleNavigation);

    return () => {
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);

  // Handle link clicks for client-side routing
  React.useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.getAttribute('href')?.startsWith('/')) {
        e.preventDefault();
        const href = anchor.getAttribute('href') || '/';
        
        // Update URL without page reload
        window.history.pushState({}, '', href);
        
        // Trigger navigation handling
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    document.addEventListener('click', handleLinkClick);
    
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  // Protected route check
  const isProtectedRoute = (page: string) => {
    const protectedRoutes = ['payment'];
    return protectedRoutes.includes(page);
  };

  // Redirect to auth if accessing protected route without authentication
  React.useEffect(() => {
    if (isProtectedRoute(currentPage) && !isAuthenticated) {
      window.history.pushState({}, '', '/login');
      setCurrentPage('auth');
    }
  }, [currentPage, isAuthenticated]);

  // Render the appropriate page
  const renderPage = () => {
    // Show loading if checking authentication
    if (isProtectedRoute(currentPage) && isAuthenticated === null) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      );
    }

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
        // Redirect authenticated users away from auth page
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