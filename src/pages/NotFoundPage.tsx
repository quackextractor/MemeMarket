import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ModeToggle } from '@/components/ModeToggle';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen items-center justify-center p-4 relative bg-background text-foreground">
            <div className="absolute top-4 right-4">
                <ModeToggle />
            </div>
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <CardTitle className="text-4xl font-bold mb-2">404</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-xl mb-6">Oops! Page not found.</p>
                    <p className="text-muted-foreground mb-8">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                    <Button onClick={() => navigate('/dashboard')} size="lg">
                        Go Home
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default NotFoundPage;
