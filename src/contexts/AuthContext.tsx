import { createContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of the user object
// In a real app, this might include token, email, roles, etc.
interface User {
    username: string;
    loggedIn: boolean;
}

// Define the shape of the context
interface AuthContextType {
    user: User | null;
    login: (username: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    isLoggingOut: boolean;
}

// Create the context with a default value of undefined
// This helps us detect if the hook is used outside the provider
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider component
 * Wraps the application and provides authentication state to all children.
 * 
 * Educational Note:
 * Context is like a global state container. Any component inside this Provider
 * can access the values we pass to the `value` prop without prop drilling.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    // Check localStorage on mount to persist login state
    useEffect(() => {
        const storedUser = localStorage.getItem('meme_market_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Failed to parse user from local storage", error);
                localStorage.removeItem('meme_market_user');
            }
        }
    }, []);

    const login = (username: string) => {
        setIsLoggingOut(false);
        const newUser = { username, loggedIn: true };
        setUser(newUser);
        localStorage.setItem('meme_market_user', JSON.stringify(newUser));
    };

    const logout = () => {
        setIsLoggingOut(true);
        setUser(null);
        localStorage.removeItem('meme_market_user');
    };

    const isAuthenticated = !!user?.loggedIn;

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isLoggingOut }}>
            {children}
        </AuthContext.Provider>
    );
};
