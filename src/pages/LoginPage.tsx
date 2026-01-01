import { useState, FormEvent, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ModeToggle } from '@/components/ModeToggle';

/**
 * LoginPage Component
 * Handles user login with validation.
 */
const LoginPage = () => {
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(location.state?.message || '');

  const { login } = useAuth();
  const navigate = useNavigate();

  // Clear history state so the message doesn't persist on refresh
  useEffect(() => {
    if (location.state?.message) {
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Prevent default form submission (page reload)

    // Validation Logic
    if (username.length < 3) {
      setError('Username must be at least 3 characters long.');
      return;
    }

    if (password.length < 5) {
      setError('Password must be at least 5 characters long.');
      return;
    }

    // If validation passes
    setError('');
    login(username);
    
    // `replace: true` prevents the user from going back to login page
    // by clicking the browser's back button immediately after logging in.
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md relative">
        <div className="absolute right-4 top-4">
          <ModeToggle />
        </div>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">MemesPro Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 rounded bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-200 p-3 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) setError('');
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-center text-xs text-muted-foreground">
            <p>This is a mock login.</p>
            <p>Username &ge; 3 chars, Password &ge; 5 chars.</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
