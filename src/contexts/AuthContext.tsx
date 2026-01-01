import { createContext, useState, ReactNode } from 'react';

// Define the shape of the user object
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
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider component
 * Wraps the application and provides authentication state to all children.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('meme_market_user');
        if (storedUser) {
            try {
                return JSON.parse(storedUser);
            } catch (error) {
                console.error("Failed to parse user from local storage", error);
                localStorage.removeItem('meme_market_user');
                return null;
            }
        }
        return null;
    });
    const [isLoggingOut, setIsLoggingOut] = useState(false);

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
