import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

/**
 * Custom hook to use the AuthContext.
 * 
 * Educational Note:
 * Creating a custom hook like this is a best practice because:
 * 1. It abstracts the `useContext` call.
 * 2. It allows us to add error handling (checking if used inside Provider).
 * 3. It provides a cleaner API for components (`const { user } = useAuth()`).
 */
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};
