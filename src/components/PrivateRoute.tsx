import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * PrivateRoute Component
 * A wrapper component that checks if the user is authenticated.
 * 
 * Educational Note:
 * This is a common pattern in React for protecting routes.
 * If the user is authenticated, we render the child routes using <Outlet />.
 * If not, we redirect them to the login page using <Navigate />.
 */
const PrivateRoute = () => {
    const { isAuthenticated, isLoggingOut } = useAuth();

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
        // If the user is intentionally logging out, don't show the error message
        const state = isLoggingOut ? {} : { message: "You must be logged in to view that page." };
        return <Navigate to="/login" state={state} replace />;
    }

    // If authenticated, render child routes
    return <Outlet />;
};

export default PrivateRoute;
