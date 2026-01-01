import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useMemes } from '../hooks/useMemes';
import { useCart } from '../hooks/useCart';
import { MemeCard } from '../components/MemeCard';

const DashboardPage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { memes, loading, error } = useMemes();
    const { itemCount } = useCart();

    const mostPopularMeme = useMemo(() => {
        if (!memes.length) return null;
        // Sort by rating descending
        return [...memes].sort((a, b) => b.rating - a.rating)[0];
    }, [memes]);

    return (
        <div className="flex min-h-screen items-start justify-center bg-gray-100 p-8">
            <Card className="w-full max-w-4xl">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-3xl font-bold">Dashboard</CardTitle>
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => navigate('/cart')}>
                                Cart ({itemCount})
                            </Button>
                            <Button variant="destructive" onClick={logout}>
                                Logout
                            </Button>
                        </div>
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

                        <div className="mt-6">
                            <h3 className="text-xl font-semibold mb-4">Meme Statistics</h3>

                            {loading && (
                                <div className="grid gap-4 md:grid-cols-3">
                                    <Skeleton className="h-[200px] w-full" />
                                    <Skeleton className="h-[200px] w-full" />
                                    <Skeleton className="h-[200px] w-full" />
                                </div>
                            )}

                            {error && (
                                <div className="text-red-500 p-4 border border-red-200 rounded-md bg-red-50">
                                    Failed to load memes
                                </div>
                            )}

                            {!loading && !error && (
                                <div className="grid gap-4 md:grid-cols-3">
                                    <Card>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-sm font-medium">Total Memes</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">{memes.length}</div>
                                        </CardContent>
                                    </Card>

                                    <Card onClick={() => navigate('/cart')} className="cursor-pointer hover:bg-gray-50 transition-colors">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-sm font-medium">Items in Cart</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">{itemCount}</div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-sm font-medium">Categories</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                {new Set(memes.map(m => m.category)).size}
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-sm font-medium">Top Rated</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                {memes.filter(m => m.rating === 5).length}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}

                            {!loading && !error && mostPopularMeme && (
                                <div className="mt-8 flex flex-col items-center">
                                    <h3 className="text-xl font-semibold mb-4 text-center">Most Popular Meme</h3>
                                    <div className="max-w-sm w-full">
                                        <MemeCard meme={mostPopularMeme} />
                                    </div>
                                </div>
                            )}
                        </div>

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
