import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DashboardPage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen items-start justify-center bg-gray-100 p-8">
            <Card className="w-full max-w-4xl">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-3xl font-bold">Dashboard</CardTitle>
                        <Button variant="destructive" onClick={logout}>
                            Logout
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <p className="text-lg">
                            Welcome back, <strong>{user?.username}</strong>!
                        </p>
                        <p className="text-muted-foreground">
                            You have successfully logged in.
                        </p>


                        <div className="pt-4">
                            <Button onClick={() => navigate('/memes')} className="w-full sm:w-auto">
                                Go to Memes
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default DashboardPage;
