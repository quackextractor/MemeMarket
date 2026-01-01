import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface Meme {
    id: string;
    name: string;
    url: string;
    width: number;
    height: number;
    box_count: number;
    rating?: number;
    category?: string;
}

const CATEGORIES = ["animals", "celebrities", "gaming", "school", "random"];

const DashboardPage = () => {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const [memes, setMemes] = useState<Meme[]>([]);
    const [stats, setStats] = useState({
        totalMemes: 0,
        totalCategories: 0,
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMemes = async () => {
            try {
                const response = await fetch('https://api.imgflip.com/get_memes');
                const data = await response.json();

                if (data.success) {
                    const fetchedMemes: Meme[] = data.data.memes.map((meme: Meme) => ({
                        ...meme,
                        rating: Math.floor(Math.random() * 5) + 1,
                        category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
                    }));

                    setMemes(fetchedMemes);

                    const uniqueCategories = new Set(fetchedMemes.map(m => m.category));
                    setStats({
                        totalMemes: fetchedMemes.length,
                        totalCategories: uniqueCategories.size,
                    });
                }
            } catch (error) {
                console.error("Failed to fetch memes:", error);
            }
        };

        fetchMemes();
    }, []);

    const popularMemes = memes
        .filter(m => (m.rating || 0) >= 4.5) // High rating threshold
        .slice(0, 4); // Top 4

    return (
        <div className="flex min-h-screen flex-col bg-gray-100 p-8">
            <div className="w-full max-w-6xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-muted-foreground">
                            Welcome back, {user?.username}
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <Button onClick={() => navigate('/memes')}>
                            Go to Memes
                        </Button>
                        <Button variant="destructive" onClick={logout}>
                            Logout
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Memes
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalMemes}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Categories
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalCategories}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Cart Items
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{cartCount}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Popular Memes Section */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold tracking-tight">Popular Memes</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {popularMemes.map((meme) => (
                            <Card key={meme.id} className="overflow-hidden">
                                <div className="aspect-square relative">
                                    <img
                                        src={meme.url}
                                        alt={meme.name}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <CardHeader className="p-4">
                                    <CardTitle className="text-base truncate" title={meme.name}>
                                        {meme.name}
                                    </CardTitle>
                                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                                        <span>★ {meme.rating}</span>
                                        <span className="capitalize">{meme.category}</span>
                                    </div>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
