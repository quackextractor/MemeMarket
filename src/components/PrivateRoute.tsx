import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
const PrivateRoute = () => {
    const { isAuthenticated, isLoggingOut } = useAuth();
    
    if (!isAuthenticated) {
        const state = isLoggingOut ? {} : { message: "You must be logged in to view that page." };
        return <Navigate to="/login" state={state} replace />;
    }
    
    return <Outlet />;
};

export default PrivateRoute;
