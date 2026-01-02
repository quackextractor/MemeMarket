import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useMemes } from '../hooks/useMemes';
import { useCart } from '../hooks/useCart';
import { MemeCard } from '../components/MemeCard';
import { ModeToggle } from '@/components/ModeToggle';

import { ErrorState } from '@/components/ErrorState';

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

    const memeOfTheDay = useMemo(() => {
        if (!memes.length) return null;
        // Deterministic random based on date
        const today = new Date().toDateString();
        let hash = 0;
        for (let i = 0; i < today.length; i++) {
            hash = today.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % memes.length;
        return memes[index];
    }, [memes]);

    return (
        <div className="flex min-h-screen items-start justify-center p-8">
            <Card className="w-full max-w-4xl">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-3xl font-bold">Dashboard</CardTitle>
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => navigate('/memes')}>
                                Gallery
                            </Button>
                            <Button variant="outline" onClick={() => navigate('/cart')}>
                                Cart ({itemCount})
                            </Button>
                            <Button variant="destructive" onClick={logout}>
                                Logout
                            </Button>
                            <ModeToggle />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <p className="text-lg">
                            User <strong>{user?.username}</strong> logged in!
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
                                <ErrorState message="Failed to load memes" onRetry={() => window.location.reload()} />
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

                                    <Card>
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

                                </div>
                            )}

                            {!loading && !error && mostPopularMeme && (
                                <div className="mt-8 grid md:grid-cols-2 gap-8">
                                    <div className="flex flex-col items-center">
                                        <h3 className="text-xl font-semibold mb-4 text-center">Most Popular Meme</h3>
                                        <div className="max-w-sm w-full">
                                            <MemeCard meme={mostPopularMeme} />
                                        </div>
                                    </div>
                                    {memeOfTheDay && (
                                        <div className="flex flex-col items-center">
                                            <h3 className="text-xl font-semibold mb-4 text-center">Meme of the Day</h3>
                                            <div className="max-w-sm w-full">
                                                <MemeCard meme={memeOfTheDay} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="pt-4 flex justify-center">
                            <Button onClick={() => navigate('/memes')} size="lg" className="w-full sm:w-64 text-lg">
                                I want to see memes!
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default DashboardPage;
