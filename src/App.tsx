import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider } from './contexts/ThemeContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { MemesPage } from './pages/MemesPage';
import MemeDetailPage from './pages/MemeDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import CartPage from './pages/CartPage';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

/**
 * App Component
 * The root component of the application.
 * 
 * Educational Note:
 * We wrap the entire application in `AuthProvider` so that any component
 * can access the authentication state.
 * We use `BrowserRouter` (aliased as Router) to enable client-side routing.
 */
function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="meme-market-theme">
      <AuthProvider>
        <CartProvider>
          <Router>
            <Routes>
              {/* Public Route */}
              <Route path="/login" element={<LoginPage />} />

              {/* Protected Routes */}
              {/* 
                Educational Note:
                We wrap protected routes inside the PrivateRoute component.
                If the user is not authenticated, PrivateRoute will redirect them to /login.
              */}
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/memes" element={<MemesPage />} />
                <Route path="/memes/:id" element={<MemeDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
              </Route>

              {/* Default Redirect */}
              {/* Redirect root URL to dashboard (which will then redirect to login if needed) */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              {/* Catch-all for 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
